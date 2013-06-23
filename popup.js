document.addEventListener('DOMContentLoaded', function () {
    $('#board').val(localStorage.board||null);
    $('#list').val(localStorage.list||null);
});

document.addEventListener('Trelloready', function () {

    Trello.authorize(options.trello_options);
    Trello.get('boards/'+localStorage.board, function(board){
        $('#boardtext').text(board.name);
    });
    Trello.get('lists/'+localStorage.list, function(list){
        $('#listtext').text(list.name);
    });


    $('#submit').on('click', function(e) {
        e.preventDefault();
        Trello.authorize(options.trello_options);

        var data = {
            name: $('#title').val(),
            desc: $('#url').val(),
            idList: encodeURIComponent($('#list').val()),
            token: localStorage.trello_token
        };

        Trello.post('cards', data).done(function(){
            window.close();
        });
    });

    $('#options').on('click', function(e) {
        e.preventDefault();
        var optionsUrl = chrome.extension.getURL('options.html');

        chrome.tabs.query({url: optionsUrl}, function(tabs) {
            if (tabs.length) {
                chrome.tabs.update(tabs[0].id, {active: true});
            } else {
                chrome.tabs.create({url: optionsUrl});
            }
        });
    });
});
chrome.tabs.getSelected(null, function(tab) {
    $('#url').val(tab.url);
    $('#title').val(tab.title);
});
