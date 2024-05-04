import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ReportProvider } from './context/ReportContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReportProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReportProvider>
  </React.StrictMode>,
)
