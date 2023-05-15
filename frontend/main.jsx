import React from "react"
import ReactDOM from "react-dom"
import { createRoot } from 'react-dom/client';
import "./index.css"
import App from "./App"

const domNode = document.getElementById('root');
const root = createRoot(domNode);


root.render(<App />);
