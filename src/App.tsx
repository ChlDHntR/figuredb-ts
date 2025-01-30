import React, { Fragment, useState, useEffect, useRef } from 'react'
import './style/style.scss'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import server from './axios/server.ts'
import { Import } from './component/Import.js'
import Main from './component/Main.tsx'
import NavBar from './component/Navbar.tsx'
import FigurePage from './component/FigurePage.tsx'
import UserAuthProvider from './context/UserAuthProvider.tsx'
import FlashMessageProvider from './context/FlashMessageProvider.tsx'

function App({ user, data }: any) {
  const [currUser, setCurrUser] = useState(user)
  const [messageOn, setMessageOn] = useState(false)
  const alertMessage = useRef('')
  // useEffect(() => {
  //   let userdata = localStorage.getItem('currentUser')
  //   if (userdata) {
  //     setCurrUser(JSON.parse(userdata))
  //   }
  // }, [])

  const handleLogout = () => {
    localStorage.clear()
    setCurrUser(null)
  }

  const messageAlert = (message: string, type: string) => {
    alertMessage.current = message
    setMessageOn(true)
    setTimeout(() => {
      setMessageOn(false)
    }, 5000)
  }

  return (
    <UserAuthProvider value={{ currUser, setCurrUser }}>
      <FlashMessageProvider value={{ messageAlert }}>
        {messageOn && (
          <div className="flash_message">
            <p>{alertMessage.current}</p>
          </div>
        )}
        <div className="logout_btn" onClick={handleLogout}>
          <span>OUT</span>
        </div>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar data={data} />
                  <Main data={data} />
                </>
              }
            />
            <Route
              path="/figure/:id"
              element={
                <>
                  <NavBar data={data}></NavBar>
                  <FigurePage data={data} />
                </>
              }
            />
            <Route path="/import" element={<Import data={data} />} />
            <Route path="/*" element={<h1> nothing </h1>} />
          </Routes>
        </Router>
      </FlashMessageProvider>
    </UserAuthProvider>
  )
}

export default App
