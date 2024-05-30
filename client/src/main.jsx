import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ReportProvider } from './context/report/reportContext.jsx'
import { Provider } from "react-redux";
import store from '../redux/store/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReportProvider>
      <BrowserRouter>
      <Provider store={store}>
        <App />
        </Provider>
      </BrowserRouter>
    </ReportProvider>
  </React.StrictMode>,
)
