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
  const alertMessage = useRef('testing')
  const flashRef = useRef<HTMLDivElement>(null)
  const alertColorRef = useRef('')
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

  useEffect(() => {
    if (messageOn) {
      flashRef.current!.style.opacity = '0'
      flashRef.current!.style.bottom = '0'
      setTimeout(() => {
        flashRef.current!.style.opacity = '1'
        flashRef.current!.style.bottom = '50px'
      }, 100)
    }

  }, [messageOn])
  
  const messageAlert = (message: string, type: string) => {
    alertMessage.current = message
    alertColorRef.current = type ? 'green' : 'red'
    setMessageOn(true)
    async function name() {
      let opacityChange = setTimeout(() => {
      }, 3500)
    }


////// CONTINUE HERE!! CODE NOT RUNNING!!

  }

  return (
    <UserAuthProvider value={{ currUser, setCurrUser }}>
      <FlashMessageProvider value={{ messageAlert }}>
        {messageOn && (
          <div ref={flashRef} className={`flash_message`} style={{backgroundColor: alertColorRef.current}}>
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
