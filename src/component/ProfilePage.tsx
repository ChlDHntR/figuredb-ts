import { useEffect, useState } from 'react'
import { faUser, faEnvelope, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfilePageIndex from './ProfilePageIndex'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function ProfilePage() {
  const [sectionIndex, setSectionIndex] = useState(1)
  const currUser = useSelector((state: RootState) => state.user.value)
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
