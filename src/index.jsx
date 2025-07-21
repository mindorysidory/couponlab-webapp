import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'  // ← .jsx 확장자 제거

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
