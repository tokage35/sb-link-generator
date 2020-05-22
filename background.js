chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.getSelected(null, function(tab) {
        var text_area = document.createElement('textarea');
        text_area.value = "["+tab.title+" "+tab.url+"]";
        document.body.appendChild(text_area);
        text_area.select();
        document.execCommand('copy');
        document.body.removeChild(text_area);
    });
});
