import { useEffect, useState } from 'react'
import './style/style.scss'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import { Import } from './component/Import.js'
import { useSelector, useDispatch } from 'react-redux'
import Main from './component/Main.tsx'
import NavBar from './component/Navbar.tsx'
import FigurePage from './component/FigurePage.tsx'
import { PopUp } from './component/PopUp.tsx'
import LoginInitProvider from './context/LoginInitProvider.tsx'
import UserAuthProvider from './context/UserAuthProvider.tsx'
import FloatMessage from './component/FloatMessage.tsx'
import LoginPage from './component/LoginPage.tsx'
import TradingPage from './component/TradingPage.tsx'
import UploadPage from './component/UploadPage.tsx'
import { SocketProvider } from './context/SocketProvider.tsx'
import ProfilePage from './component/ProfilePage.tsx'
import { RootState } from './redux/store.ts'
import { setUser } from './features/userSlice/userSlice.ts'

function App({ user, data }: any) {
  //const [currUser, setCurrUser] = useState(user)
  const [messageOn, setMessageOn] = useState(false)
  const [popUp, setPopUp] = useState({ state: false, action: 'register' })
  const currUser = useSelector((state: RootState) => state.user.value)
  const dispatch = useDispatch()

  const handleClosePopUp = () => {
    setPopUp((prev) => ({ ...prev, state: false }))
  }

  useEffect(() => {
    dispatch(setUser(user))
  }, [])

  return (
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
                path='/profile'
                element={
                  <>
                    <NavBar data={data} />
                    <ProfilePage />
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
              <Route
                path='/upload'
                element={
                  <>
                    <NavBar data={data} />
                    <UploadPage data={data} />
                  </>
                }
              />
              <Route path='/import' element={<Import data={data} />} />
              <Route path='/*' element={<h1> nothing </h1>} />
            </Routes>
          </Router>
        </LoginInitProvider>
      </FloatMessage>
  )
}

export default App
