chrome.runtime.onInstalled.addListener(function () {
  console.log("SafeLinkBP extension installed.");
});

chrome.action.onClicked.addListener((tab) => {
  console.log("Icon clicked, injecting script.");
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: checkPageSafety,
  });
});
