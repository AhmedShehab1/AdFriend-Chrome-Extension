const EWE = require('@eyeo/webext-ad-filtering-solution');


(async () => {

  try {
    // const response = await fetch(chrome.runtime.getURL('scriptsOutput/custom-mv3-subscriptions.json'));
    // const bundledSubscriptions = await response.json();
    
    const bundledSubscriptions = [
      {
        "id": "8C13E995-8F06-4927-BEA7-6C845FB7EEBF",
        "type": "ads",
        "languages": [
          "en"
        ],
        "title": "EasyList",
        "homepage": "https://easylist.to/",
        "url": "https://easylist-downloads.adblockplus.org/v3/full/easylist.txt",
        "mv2_url": "https://easylist-downloads.adblockplus.org/easylist.txt",
        "diff_url": "https://easylist-downloads.adblockplus.org/v3/diff/easylist/26ae9c35c30e7926df5565c060137ddc00899d7d.json",
        "expires": "1 days (update frequency)"
      },
      {
        "id": "D72B6F06-52B2-4FED-96A2-1BF59CDD7AEC",
        "type": "privacy",
        "title": "EasyPrivacy",
        "homepage": "https://easylist.to/",
        "requires": [
          "8C13E995-8F06-4927-BEA7-6C845FB7EEBF"
        ],
        "url": "https://easylist-downloads.adblockplus.org/v3/full/easyprivacy.txt",
        "mv2_url": "https://easylist-downloads.adblockplus.org/easyprivacy.txt",
        "diff_url": "https://easylist-downloads.adblockplus.org/v3/diff/easyprivacy/26ae9c35c30e7926df5565c060137ddc00899d7d.json",
        "expires": "1 days (update frequency)"
      }];
      
      const addonInfo = {
        bundledSubscriptionsPath: 'scriptsOutput/subscriptions',
        bundledSubscriptions
      };

      const firstRunInfo = await EWE.start(addonInfo);
    } catch (e) {
      console.error(e);
    }
    
})();
  
const API_URL = "https://zenquotes.io/api/quotes/";

const fetchAndStore = async () => {
  try {
      const resp = await fetch(API_URL);

      if (!resp.ok) throw new Error('Failed to fetch quotes');
      const data = await resp.json();

      const filteredQuotes = data.map(q => q.h);
      
      chrome.storage.local.set({ quotes: filteredQuotes }).then(() => {
          console.log("Quotes stored successfully");
      });
      
  } catch (err) {
      console.error("Error fetching Inspirational Quotes:", err);
  }
};

chrome.runtime.onStartup.addListener(() => {
  console.log("Chrome started - Refreshing quotes...");
  fetchAndStore();
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log("Blocked request:", details.url);
  },
  { urls: ["*://*.doubleclick.net/*", "*://*.adsbygoogle.com/*"] }
);


chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === 'install') {
      chrome.tabs.create({
        url: "onboarding.html"
      });
      console.log("Extension installed - Fetching quotes...");
      fetchAndStore();
    }
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.action === "closeTab" && sender.tab) {
        chrome.tabs.remove(sender.tab.id);
    }
});

chrome.tabs.create({
  url: "onboarding.html"
});
