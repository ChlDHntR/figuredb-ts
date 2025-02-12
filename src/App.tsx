import React, { useState, useRef } from 'react'
import './style/style.scss'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import server from './axios/server.ts'
import { Import } from './component/Import.js'
import Main from './component/Main.tsx'
import NavBar from './component/Navbar.tsx'
import FigurePage from './component/FigurePage.tsx'
import { PopUp } from './component/PopUp.tsx'
import LoginInitProvider from './context/LoginInitProvider.tsx'
import UserAuthProvider from './context/UserAuthProvider.tsx'
import FloatMessage from './component/FloatMessage.tsx'
import LoginPage from './component/LoginPage.tsx'
import TradingPage from './component/TradingPage.tsx'

function App({ user, data }: any) {
  const [currUser, setCurrUser] = useState(user)
  const [messageOn, setMessageOn] = useState(false)
  const [popUp, setPopUp] = useState({ state: false, action: 'register' })

  const handleClosePopUp = () => {
    setPopUp((prev) => ({ ...prev, state: false }))
  }

  return (
    <UserAuthProvider value={{ currUser, setCurrUser }}>
      <FloatMessage>
        <LoginInitProvider value={setPopUp}>
          {popUp.state && (
            <PopUp handleClose={handleClosePopUp} children={<LoginPage setPopUp={setPopUp} popUp={popUp} />} />
          )}
          <Router>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <NavBar data={data} />
                    <Main data={data} />
                  </>
                }
              />
              <Route
                path='/figure/:id'
                element={
                  <>
                    <NavBar data={data} />
                    <FigurePage data={data} />
                  </>
                }
              />
              <Route
                path='/trade'
                element={
                  <>
                    <NavBar data={data} />
                    <TradingPage data={data} />
                  </>
                }
              />
              <Route path='/import' element={<Import data={data} />} />
              <Route path='/*' element={<h1> nothing </h1>} />
            </Routes>
          </Router>
        </LoginInitProvider>
      </FloatMessage>
    </UserAuthProvider>
  )
}

export default App
