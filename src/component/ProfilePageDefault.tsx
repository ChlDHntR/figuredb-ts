import { useState, useContext, useEffect, useRef } from 'react'
import { UserAuthContext } from '../context/UserAuthProvider'
import { setUser } from '../features/userSlice/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import server from '../axios/server'
import { RootState } from '../redux/store'

export default function ProfilePageDefault() {
  const currUser = useSelector((state: RootState) => state.user.value)
  const [username, setUsername] = useState(currUser?.username)
  const [newPassword, setNewPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const userNameData = useRef<any[] | null>(null)
  const [errormsg, setErrormsg] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    server.get('users').then((response: any) => {
      userNameData.current = response.data.map((element: any) => element.username)
    })
  }, [])
  const userNameCheck = (username: string) => {
    if (username === '') {
      setUsernameError(true)
      setErrormsg('現在のユーザー名又は新しいユーザー名を入力してください')
      return
    }
    if (username === currUser.username) {
      setUsernameError(false)
      return
    }
    if (userNameData.current?.includes(username)) {
      setUsernameError(true)
      setErrormsg('ユーザー名が既に使われています')
      return
    }
    setUsernameError(false)
  }

  const handleSave = () => {
    // check if username is available
    if (currentPassword !== currUser.pwd) {
      setPasswordError(true)
      return
    }
    let newUser = {
      ...currUser,
      username: username,
      pwd: newPassword === '' ? currUser.pwd : newPassword,
    }
    server.put(`users/${currUser.id}`, newUser).then((res) => {
      alert('保存完了')
      dispatch(setUser(newUser))
      setCurrentPassword('')
      setNewPassword('')
    })
  }

  return (
    <div className='profile-page-default'>
      <h2>プロフィール設定</h2>
      <div className='form-group'>
        <div className='name'>ユーザー名</div>
        <div className='input-field-wrap box'>
          <div className='left-margin'></div>
          <input
            type='text'
            value={username}
            onChange={(e) => {
              userNameCheck(e.target.value)
              setUsername(e.target.value)
            }}
          />
          <div className='right-margin'></div>
        </div>
        {usernameError && <div className='error'>{errormsg}</div>}
      </div>
      <div className='form-group'>
        <div className='name'>新しいパスワード</div>
        <div className='input-field-wrap box'>
          <div className='left-margin'></div>
          <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <div className='right-margin'></div>
        </div>
      </div>
      <div className='form-group'>
        <div className='name'>現在のパスワード</div>
        <div className='input-field-wrap box'>
          <div className='left-margin'></div>
          <input
            type='password'
            value={currentPassword}
            onChange={(e) => {
              setPasswordError(false)
              setCurrentPassword(e.target.value)
            }}
          />
          <div className='right-margin'></div>
        </div>
        {passwordError && <div className='error'>パスワードが違います</div>}
        <button disabled={usernameError} onClick={handleSave}>
          保存
        </button>
      </div>
    </div>
  )
}
