import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import WsProvider from '@api/provider'

ReactDOM.render(
    <React.StrictMode>
        <WsProvider>
            <App />
        </WsProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
