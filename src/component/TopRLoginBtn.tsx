import React, { MouseEventHandler, useContext, useState } from 'react'
import { User } from '../interface.type/interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faCaretDown, faArrowRightFromBracket, faL } from '@fortawesome/free-solid-svg-icons'
import GeneralDropDown from './GeneralDropDown'
import { UserAuthContext } from '../context/UserAuthProvider'
import { FlashMessageContext } from '../context/FloatMessageProvider'
import { LoginInitContext } from '../context/LoginInitProvider'
import { useNavigate } from 'react-router-dom'

library.add(faUser)

export default function TopRLoginBtn({ user }: any) {
  const [showDrop, setShowDrop] = useState(false)
  const { setCurrUser } = useContext(UserAuthContext)
  const { messageAlert } = useContext(FlashMessageContext)
  const setPopUp: any = useContext(LoginInitContext)
  const navigate = useNavigate()

  const handleLogOut = () => {
    setCurrUser(null)
    localStorage.clear()
    messageAlert('ログアウトしました', true)
  }

  const handleMouseEnter = () => {
    setShowDrop(true)
  }

  const handleMouseLeave = () => {
    setShowDrop(false)
  }

  const onLogin = () => {
    setPopUp({ state: true, action: 'login' })
  }

  const onSignUp = () => {
    setPopUp({ state: true, action: 'register' })
  }

  const handleUser = () => {
    navigate('/profile')
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='TopRLoginBtn'>
      {user ? (
        <>
          <div className='nav-user'>
            <div>
              <FontAwesomeIcon icon={faUser} />
              <FontAwesomeIcon className='user-caret-down' icon={faCaretDown} />
            </div>
          </div>
          {showDrop && (
            <GeneralDropDown>
              <div className='DropDown-wrapper'>
                <div className='profile-btn' onClick={handleUser}>
                  <FontAwesomeIcon icon={faUser} />
                  <p>ユーザー</p>
                </div>
                <div onClick={handleLogOut} className='logout-btn'>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  <p>ログアウト</p>
                </div>
              </div>
            </GeneralDropDown>
          )}
        </>
      ) : (
        <div className='loginBtn'>
          <div className='login' onClick={onLogin}>
            <p>ログイン</p>
          </div>
          <div className='signup' onClick={onSignUp}>
            <p>登録</p>
          </div>
        </div>
      )}
    </div>
  )
}
