import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios'
import { Import } from './component/Import.tsx'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import server from './axios/server.ts'
import {store} from './redux/store'
import { Provider } from 'react-redux'

server
  .get('figures')
  .then((response) => {
    let username = localStorage.getItem('currentUser')
    let foundUser: string | null = null
      server.get('users').then((response2) => {
        let userData = response2.data
        foundUser = username? userData.find((element: any) => element.username === username) : null
        createRoot(document.getElementById('root')!).render(
          <Provider store={store}>  
            <App user={foundUser} data={response.data} />
          </Provider>
      )})

  })
  .catch((err) => {
    alert('CHECK SERVER CONNECTION')
  })
