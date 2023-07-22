chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  let tab = tabs[0];
  let url = tab.url;
  let title = tab.title;
  let scrapboxNotation = `[${title} ${url}]`;

  navigator.clipboard.writeText(scrapboxNotation)
    .then(() => {
      console.log('Copying to clipboard was successful!');
      window.close();
    })
    .catch(err => {
      console.error('Could not copy text: ', err);
    });
});
