import React, { useState, useContext, useRef } from 'react'
import { UserAuthContext } from '../context/UserAuthProvider'
import server from '../axios/server.ts'
import { User } from '../interface.type/interface.ts'

export default function LoginPage({ setPopUp }: any) {
  const username = useRef<HTMLInputElement>(null)
  const pwd = useRef<HTMLInputElement>(null)
  const { setCurrUser }: any = useContext(UserAuthContext)
  const [isLogingin, setIsLogingin] = useState(false)
  const [register, setRegister] = useState(false)

  const handleLogin = () => {
    server.get('users').then((response) => {
      let userData = response.data
      let foundUser = userData.find((element: User) => element.username === username.current!.value)
      if (!foundUser || !(foundUser.pwd === pwd.current!.value)) {
        alert('username or password is wrong')
        return
      }

      localStorage.setItem('currentUser', foundUser.username)

      setCurrUser(foundUser)
      setIsLogingin(true)
      setTimeout(() => {
        setPopUp(false)
      }, 1000)
    })
  }
  const handleRegister = () => {
    let newUser = {
      username: username.current!.value,
      pwd: pwd.current!.value,
      list: {},
    }
    server.post('users', newUser).then((res) => {
      console.log('registered' + newUser.username)
      alert('ユーザー登録された！')
      setRegister(false)
    })
  }

  return (
    <div className='loginBox'>
      <div className='loginBoxSmall'>
        {isLogingin ? (
          <div className='text'>LOGING IN.....</div>
        ) : (
          <>
            <div className='text'>{register ? '登録' : 'ログイン'}</div>
            <form
              action=''
              onSubmit={(e) => {
                e.preventDefault()
                if (register) {
                  handleRegister()
                  return
                }
                handleLogin()
              }}
            >
              <div className='input'>
                <fieldset>
                  <legend>USERNAME</legend>
                  <input type='text' ref={username} />
                </fieldset>
              </div>
              <div className='input'>
                <fieldset>
                  <legend>PASSWORD</legend>
                  <input type='password' ref={pwd} />
                </fieldset>
              </div>
              {register ? <button>登録</button> : <button>ログイン</button>}
            </form>
            <div className='register_button'>
              <button onClick={() => setRegister((prev) => !prev)}>{register ? 'ログイン' : '登録'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
