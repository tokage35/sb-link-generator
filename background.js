chrome.commands.onCommand.addListener((command) => {
  console.log('Command:', command);  // Log the command

  if (command === 'copy_url') {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let tab = tabs[0];
      let url = tab.url;
      let title = tab.title;
      let scrapboxNotation = `[${title} ${url}]`;

      // Log the tab information
      console.log('Tab information:', tab);

      // Log the Scrapbox notation
      console.log('Scrapbox notation:', scrapboxNotation);

      // Inject script into the tab to access clipboard API
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: copyToClipboard,
        args: [scrapboxNotation]
      });
    });
  }
});

// Function to be injected into the tab
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copying to clipboard was successful!');
  }, (err) => {
    console.error('Could not copy text: ', err);
  });
}
