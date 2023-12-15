import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./assets/custom.scss";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css'
import Routeme from './components/Routeme.jsx';
// Bootstrap CSS
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routeme />
</BrowserRouter>
)
