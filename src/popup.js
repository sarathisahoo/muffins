// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "updateElement") {
        // Display the retrieved content in the popup
        const contentArray = message.content;
        updateList(contentArray);
    }
});

// Read data from chrome.storage
chrome.storage.local.get('updateElement', function(data) {
    updateList(data.updateElement);
});

function updateList(contentArray) {

    const container = document.getElementById('container');

    // Clear existing content in the container
    container.innerHTML = "";

    // Create and append div elements for each item in the content array
    contentArray.forEach(function(item) {
        const newDiv = document.createElement('div');
        newDiv.textContent = item;
        container.appendChild(newDiv);
    });
}
