let items = [];
const removeElem1 = document.createElement('span');
removeElem1.textContent = "Remove";
removeElem1.style.color="blue";
removeElem1.style.cursor="pointer";

const removeElem2 = document.createElement('span');
removeElem2.textContent = "Remove";
removeElem2.style.color="blue";
removeElem2.style.cursor="pointer";

// Get the nested_shadow_host element
const shadowHost = document.getElementById('shadow_host').shadowRoot;
const shadowContent = shadowHost.getElementById('shadow_content');
const shadowDiv = shadowContent.getElementsByTagName('span')[0];
shadowDiv.style.border = '2px solid green';
items.push(shadowDiv.innerText);
shadowDiv.style.display = 'inline-block';
shadowDiv.style.marginRight = '10px';
removeElem1.addEventListener('click', function() {
    shadowDiv.remove();
    removeElem1.remove();
    items = items.filter(item => item !== shadowDiv.innerText);
    chrome.runtime.sendMessage({type: "updateElement", content: items});
});
shadowContent.appendChild(removeElem1);

const nestedShadowHost = shadowHost.getElementById('nested_shadow_host');
const nestedShadowRoot = nestedShadowHost.shadowRoot;
const nestedShadowContent = nestedShadowRoot.getElementById('nested_shadow_content');
const nestedShadowDiv = nestedShadowContent.getElementsByTagName('div')[0];
items.push(nestedShadowDiv.innerText);
nestedShadowDiv.style.display = 'inline-block';
nestedShadowDiv.style.marginRight = '10px'; 
nestedShadowDiv.style.border = '2px solid green';
removeElem2.addEventListener('click', function() {
    nestedShadowDiv.remove();
    removeElem2.remove();
    items = items.filter(item => item !== nestedShadowDiv.innerText);
    chrome.runtime.sendMessage({type: "updateElement", content: items});
});
nestedShadowContent.appendChild(removeElem2);
chrome.runtime.sendMessage({type: "updateElement", content: items});

// Function to handle click event on the ADD button
function addButtonClicked() {
    // Get the text from the textbox
    const inputText = textBox.value;
    textBox.value = "";

    // Create a new div element
    const newDiv = document.createElement('div');
    newDiv.textContent = inputText;

    // Get the nested_shadow_host element
    const shadowHost = document.getElementById('shadow_host').shadowRoot;
    const nestedShadowHost = shadowHost.getElementById('nested_shadow_host');

    // Open the shadow DOM of nested_shadow_host
    const nestedShadowRoot = nestedShadowHost.shadowRoot;

    // Get the nested_shadow_content element inside the shadow DOM
    const nestedShadowContent = nestedShadowRoot.getElementById('nested_shadow_content');

    // Append the new div to nested_shadow_content
    nestedShadowContent.appendChild(document.createElement('br'));
    nestedShadowContent.appendChild(newDiv);
    newDiv.style.display = 'inline-block';
    newDiv.style.marginRight = '10px';
    newDiv.style.border = '2px solid green';
    
    const removeElem = document.createElement('span');
    removeElem.textContent = "Remove";
    removeElem.style.color="blue";
    removeElem.style.cursor="pointer";
    removeElem.addEventListener('click', function() {
        newDiv.remove();
        removeElem.remove();
        items = items.filter(item => item !== newDiv.innerText);
        chrome.runtime.sendMessage({type: "updateElement", content: items});
    });
    nestedShadowContent.appendChild(removeElem);
    items.push(inputText);
    chrome.runtime.sendMessage({type: "updateElement", content: items});
}

// Create a textbox element
const textBox = document.createElement('input');
textBox.type = 'text';

// Create a button element
const addButton = document.createElement('button');
addButton.textContent = 'ADD';
addButton.addEventListener('click', addButtonClicked);

// Create a container element to hold the textbox and button
const container = document.createElement('div');
container.appendChild(textBox);
container.appendChild(addButton);

// Append the container to the end of the document body
document.body.appendChild(container);
