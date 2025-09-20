/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)

import EnvTest from "./EnvTest.jsx";

function App() {
  return <EnvTest />;
}

export default App; */

// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // your main App component

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

