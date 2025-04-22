import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import server from '../axios/server'
import MailDisplay from './MailDisplay'
import { UserAuthContext } from '../context/UserAuthProvider'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function ProfilePageMail() {
  const [mailData, setMailData] = useState<any[] | null>(null)
  const [selected, setSelected] = useState(1)
  const [selectedMail, setSelectedMail] = useState<any[] | null>(null)
  const currUser = useSelector((state: RootState) => state.user.value)

  useEffect(() => {
    server.get('mails').then((res) => setMailData(res.data))
  }, [])

  useEffect(() => {
    if (!mailData) return

    let filterMailData
    switch (selected) {
      case 1:
        filterMailData = mailData!.filter(
          (item: any) => item.from === currUser.username || item.to === currUser.username
        )
        break
      case 2:
        filterMailData = mailData!.filter((item: any) => item.from === currUser.username)
        break
      case 3:
        filterMailData = mailData!.filter((item: any) => item.to === currUser.username)
        break
    }

    setSelectedMail(filterMailData!)
  }, [selected, mailData])
  return (
    <div className='profile-page-mail'>
      <div className='select-box-container'>
        <select id='select' value={selected} onChange={(e) => setSelected(Number(e.target.value))} className='select'>
          <option value='1'>すべてのメール</option>
          <option value='2'>送信したメール</option>
          <option value='3'>受信したメール</option>
        </select>
      </div>
      <MailDisplay mails={selectedMail} />
    </div>
  )
}
