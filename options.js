$('.needsapi').hide();
var $boards = $('#boards');
var $lists = $('#lists');

document.addEventListener('Trelloready', function () {
    if(localStorage.apikey){
        Trello.authorize({
            scope: { write: true, read: true }
        });
    }
    Trello.get("members/me/boards", function(board) {
        $.each(board, function(i){
            var thisboard = board[i];
            if(!thisboard.closed){
                $boards.append('<option id="'+thisboard.id+'" '+
                    (localStorage['board'] == thisboard.id?'selected="selected"':'')+
                    '>'+thisboard.name+'</option>');
            }
        });
        updateLists(localStorage.board!==undefined?localStorage.board:board[0].id);
    });
});

function save_options() {
    var status = $('#status');

    var apikey = $('#apikey').val();
    if (apikey.length == 32) {
        localStorage.apikey = $('#apikey').val();
        status.text("Options Saved.");
    }else{
        status.text("Invalid API Key");
    }
    if(localStorage.apikey && Trello.authorized()){
        localStorage.board = $boards.children(':selected').attr('id');
        localStorage.list = $lists.children(':selected').attr('id');
    }
    setTimeout(function() {
        location.reload();
    }, 100);
}

function restore_options() {
    if(!localStorage.apikey){
        return false;
    }
    var stored_apikey = localStorage.apikey;
    var stored_board = localStorage.board;
    var stored_list = localStorage.list;

    $('#apikey').val(stored_apikey);
    $('#boards').val(stored_board);
    $('#lists').val(stored_list);

    $('.needsapi').show();
}

var updateLists = function (boardid) {
    $lists.empty();
    Trello.get("boards/"+boardid+"/lists", function(lists) {
        $.each(lists, function(i){
            var thislist = lists[i];
            if(!thislist.closed){
                if(thislist.idBoard == boardid){
                $lists.append('<option id="'+thislist.id+'" '+(localStorage['list'] == thislist.id?'selected="selected"':'')+'>'+thislist.name+'</option>');
                }
            }
        });
    });
    $('.needsapi').show();
};
$boards.on('change', function(e){
    updateLists($(e.target).children(':selected').attr('id'));
});


document.addEventListener('DOMContentLoaded', function (){
    restore_options();
});
$('#save').on('click', function (e) {
    e.preventDefault();
    save_options();
});
