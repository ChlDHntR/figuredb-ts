import React, { MouseEventHandler, useState } from 'react'
import { User } from '../interface.type/interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import GeneralDropDown from './GeneralDropDown'

library.add(faUser)

type Props = {
  user: User
  onLogin: MouseEventHandler
}
export default function TopRLoginBtn({ user, onLogin }: Props) {
  const [showDrop, setShowDrop] = useState(false)
  
  const handleMouseEnter = () => {
    setShowDrop(true)
  }

  const handleMouseLeave = () => {
    setShowDrop(false)
  }


  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="TopRLoginBtn">
      {user ? (
        <>
          <div className="nav-user">
            <div>
              <FontAwesomeIcon icon={faUser} />
              <FontAwesomeIcon className="user-caret-down" icon={faCaretDown} />
            </div>
          </div>
          {showDrop && (
            <GeneralDropDown>
              <>
                <div>Hello</div>
                <div>Test</div>
                <div>Unit</div>
              </>
            </GeneralDropDown>
          )}
        </>
      ) : (
        <div className="loginBtn" onClick={onLogin}>
          ログイン
        </div>
      )}
    </div>
  )
}
