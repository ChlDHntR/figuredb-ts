import React, { useState, useContext, useRef } from 'react'
import { UserAuthContext } from '../context/UserAuthProvider'
import server from '../axios/server.ts'
import { User } from '../interface.type/interface.ts'
import { FlashMessageContext } from '../context/FloatMessageProvider.tsx'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice/userSlice.ts'

export default function LoginPage({ setPopUp, popUp }: any) {
  const username = useRef<HTMLInputElement>(null)
  const pwd = useRef<HTMLInputElement>(null)
  const reEnterPwd = useRef<HTMLInputElement>(null)
  const [isLogingin, setIsLogingin] = useState(false)
  const [register, setRegister] = useState(popUp.action === 'register' ? true : false)
  const { messageAlert } = useContext(FlashMessageContext)
  const dispatch = useDispatch()

  const handleLogin = () => {
    server.get('users').then((response) => {
      let userData = response.data
      let foundUser = userData.find((element: User) => element.username === username.current!.value)
      if (!foundUser || !(foundUser.pwd === pwd.current!.value)) {
        alert('ユーザー名・パスワードが正しくない')
        return
      }

      localStorage.setItem('currentUser', foundUser.username)
      dispatch(setUser(foundUser))
      setIsLogingin(true)
      setTimeout(() => {
        setPopUp(false)
      }, 1000)
    })
  }
  const handleRegister = () => {
    if (pwd.current!.value !== reEnterPwd.current!.value) {
      messageAlert('パスワードが一致していません', false)
      return
    }

    server.get('users').then((response) => {
      let userData = response.data
      let foundUser = userData.find((element: any) => element.username === username.current!.value)
      if (foundUser) {
        alert('このユーザー名は既に存在します')
        return
      }
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
              {!register ? (
                <>
                  <div className='input'>
                    <fieldset>
                      <legend>USERNAME</legend>
                      <input name={!register ? 'loginName' : 'registerName'} type='text' ref={username} />
                    </fieldset>
                  </div>
                  <div className='input'>
                    <fieldset>
                      <legend>PASSWORD</legend>
                      <input name={!register ? 'loginPwd' : 'registerPwd'} type='password' ref={pwd} />
                    </fieldset>
                  </div>
                  <button>ログイン</button>
                </>
              ) : (
                <>
                  <div className='input'>
                    <fieldset>
                      <legend>USERNAME</legend>
                      <input name={!register ? 'loginName' : 'registerName'} type='text' ref={username} />
                    </fieldset>
                  </div>
                  <div className='input'>
                    <fieldset>
                      <legend>PASSWORD</legend>
                      <input name={!register ? 'loginPwd' : 'registerPwd'} type='password' ref={pwd} />
                    </fieldset>
                  </div>
                  <div className='input'>
                    <fieldset>
                      <legend>RE-ENTER PASSWORD</legend>
                      <input name={!register ? 'loginPwd' : 'registerPwd'} type='password' ref={reEnterPwd} />
                    </fieldset>
                  </div>
                  <button>登録</button>
                </>
              )}
            </form>
            <div className='register_button'>
              <button
                onClick={() => {
                  setRegister((prev) => !prev)
                }}
              >
                {register ? 'ログインへ' : '登録へ'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
