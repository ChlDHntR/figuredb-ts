import React, { useState, useContext } from 'react'
import { UserAuthContext } from '../context/UserAuthProvider'
import server from '../axios/server.ts'
import { User } from '../interface.type/interface.ts'

export default function LoginPage({ setPopUp }: any) {
  const [userName, setUserName] = useState('')
  const [pwd, setPwd] = useState('')
  const { setCurrUser } :any = useContext(UserAuthContext)
  const [isLogingin, setIsLogingin] = useState(false)
  const [register, setRegister] = useState(false)

  const handleLogin = () => {
    server.get('users').then((response) => {
      let userData = response.data
      let foundUser = userData.find((element: User) => element.username === userName)
      if (!foundUser || !(foundUser.pwd === pwd)) {
        alert('username or password is wrong')
        return
      }
      setCurrUser(foundUser)
      setIsLogingin(true)
      setTimeout(() => {
        setPopUp(false)
      }, 1000)
    })
  }
  const handleRegister = () => {
    let newUser = {
      "username": userName,
      "pwd": pwd,
      "list": {},
    }
    server.post('users', newUser).then(res => {
      console.log('registered' + newUser.username)
      alert('ユーザー登録された！')
      setRegister(false)
      setUserName('')
      setPwd('')
    })
  }

  return (
    <div className='loginBox'>
      <div className='loginBoxSmall'>
        {isLogingin ? (
          <div className='text'>LOGING IN.....</div>
        ) : (
          <>
            <div className='text'>{register? '登録' : 'ログイン'}</div>
            <div className='input'>
              <fieldset>
                <legend>USERNAME</legend>
                <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
              </fieldset>
            </div>
            <div className='input'>
              <fieldset>
                <legend>PASSWORD</legend>
                <input type='password' value={pwd} onChange={(e) => setPwd(e.target.value)} />
              </fieldset>
            </div>
            {
              register?
              <button onClick={handleRegister}>登録</button>
              : <button onClick={handleLogin}>ログイン</button>
            }
            <div className='register_button'>
              <button onClick={() => setRegister(prev => !prev)}>{register? 'ログイン' : '登録'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
