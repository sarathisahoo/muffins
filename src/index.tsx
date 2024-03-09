import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.createElement("div")
root.className = "container"
root.id = "container"
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);