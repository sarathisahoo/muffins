// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "updateElement") {
        // Store the data from the content script
        console.log(message.content);
        chrome.storage.local.set({updateElement: message.content});
    }
});