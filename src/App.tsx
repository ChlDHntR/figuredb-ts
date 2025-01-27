import React, { Fragment, useState, useEffect, useRef } from 'react'
import './style/style.scss'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import { Import } from './component/Import.js'
import Main from './component/Main.tsx'
import NavBar from './component/Navbar.tsx'
import FigurePage from './component/FigurePage.tsx'
import UserAuthProvider from './context/UserAuthProvider.tsx'

function App({ data }: any) {
  const [currUser, setCurrUser] = useState(null)
      useEffect(() => {
        let userdata = localStorage.getItem('currentUser')
        if (userdata) {  
          setCurrUser(JSON.parse(userdata))
        }
      }, [])

  return (
    <UserAuthProvider value={{ currUser, setCurrUser }}>
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
                <NavBar data={data}></NavBar>
                <FigurePage data={data} />
              </>
            }
          />
          <Route path='/import' element={<Import data={data} />} />
          <Route path='/*' element={<h1> nothing </h1>} />
        </Routes>
      </Router>
    </UserAuthProvider>
  )
}

export default App
