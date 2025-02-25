import { useContext, useEffect, useState } from 'react'
import { faUser, faEnvelope, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfilePageIndex from './ProfilePageIndex'
import { UserAuthContext } from '../context/UserAuthProvider'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const [sectionIndex, setSectionIndex] = useState(1)
  const { currUser } = useContext(UserAuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currUser) {
      navigate('/')
    }
  }, [currUser])

  return (
    <div className='profile-page-wrapper box'>
      <div className='side-nav'>
        <div className='side-nav-item' onClick={() => setSectionIndex(1)}>
          <h3>プロフィール</h3>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className='side-nav-item' onClick={() => setSectionIndex(2)}>
          <h3>メール</h3>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div className='side-nav-item' onClick={() => setSectionIndex(3)}>
          <h3>コレクション管理</h3>
          <FontAwesomeIcon icon={faList} />
        </div>
      </div>
      <div className='main-section'>
        <ProfilePageIndex index={sectionIndex} />
      </div>
    </div>
  )
}
