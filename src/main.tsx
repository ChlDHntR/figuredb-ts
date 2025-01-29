import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios'
import { Import } from './component/Import.tsx'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import server from './axios/server.ts'

server
  .get('figures')
  .then((response) => {
    let username = localStorage.getItem('currentUser')
    let foundUser
    if (username) {
      server.get('users').then((response2) => {
        let userData = response2.data
        foundUser = userData.find((element: any) => element.username === username)
        createRoot(document.getElementById('root')!).render(<App user={foundUser} data={response.data} />)
      })
    } else {
      createRoot(document.getElementById('root')!).render(<App user={null} data={response.data} />)
    }
  })
  .catch((err) => {
    alert('maybe server is not initiated')
  })
