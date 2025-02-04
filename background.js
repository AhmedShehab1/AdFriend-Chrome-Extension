chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === 'install') {
      chrome.tabs.create({
        url: "onboarding.html"
      });
    }
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "closeTab" && sender.tab) {
        chrome.tabs.remove(sender.tab.id);
    }
});