chrome.commands.onCommand.addListener((command) => {
  console.log('Command:', command);

  if (command === 'copy_url') {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let tab = tabs[0];
      let url = tab.url;
      let title = tab.title;
      let scrapboxNotation = `[${title} ${url}]`;

      console.log('Tab information:', tab);
      console.log('Scrapbox notation:', scrapboxNotation);

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: function() {
          navigator.clipboard.writeText(arguments[0]).then(() => {
            console.log('Copying to clipboard was successful!');
          }, (err) => {
            console.error('Could not copy text: ', err);
          });
        },
        args: [scrapboxNotation]
      });
    });
  }
});