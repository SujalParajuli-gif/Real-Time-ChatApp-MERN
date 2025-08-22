import React from 'react'; // Importing React to render components
import ReactDOM from 'react-dom/client'; // To render the app to the DOM
import './index.css'; // TailwindCSS styles (or any custom CSS)
import App from './App'; // Importing the main app component

// Creating a root element to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the main App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
