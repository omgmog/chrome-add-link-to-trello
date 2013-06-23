var scripturl = 'https://api.trello.com/1/client.js?key='+localStorage.apikey;
$.getScript(scripturl, function(){
    var event = new Event('Trelloready');
    document.dispatchEvent(event);
});


var options = {
    trello_options: function () {
        options = {};
        options.name = "Chrome add link to Trello";
        options.persist = true;
        options.interactive = true;
        options.expiration = "never";
        options.success = this.authorized;
        options.scope = { write: true, read: true };

        return options;
    }
};
