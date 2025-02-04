import React, { Fragment, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputBar } from './SearchBar.tsx'
import { DropDown } from './DropDown.tsx'
import { PopUp } from './PopUp.js'
import { Link } from 'react-router-dom'
import TopRLoginBtn from './TopRLoginBtn.js'
import { UserAuthContext } from '../context/UserAuthProvider.js'
import LoginPage from './LoginPage.js'
import { FigureData, User } from '../interface.type/interface.ts'
import { LoginInitContext } from '../context/LoginInitProvider.tsx'

function NavBar({ data }: { data: FigureData[] }) {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [searchList, setSearchList] = useState<FigureData[]>([])
  const [showdrop, setShowdrop] = useState(true)
  const [isFocus, setIsFocus] = useState(false)
  const { currUser }: any = useContext(UserAuthContext)
  const setPopUp: any = useContext(LoginInitContext)

  const handleSearch = useCallback(
    (e: any) => {
      setSearchValue(e.target.value)
      if (e.target.value === '') {
        setShowdrop(false)
        return
      }
      let newList = data.filter((element) => element.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setSearchList([...newList])
      if (newList.length >= 8) {
        setShowdrop(true)
      } else {
        setShowdrop(true)
      }
    },
    [data]
  )

  const handleFocus = () => {
    setIsFocus(true)
  }
  const handleBlur = () => {
    setIsFocus(false)
  }
  const handleLoginBtn = () => {
    setPopUp({ state: true, action: 'login' })
  }

  return (
    <Fragment>
      <div className='nav'>
        <a className='logo' href='/'>
          <h1>FigureDB</h1>
        </a>
        <div className='multi'>
          <div className='searchBar_wrapper'>
            <InputBar
              value={searchValue}
              placeholder={'キーワード検索'}
              className={'searchBar'}
              handleSearch={handleSearch}
              handleFocus={handleFocus}
              //handleBlur={handleBlur}
            ></InputBar>
            {showdrop && isFocus && (
              <DropDown
                data={searchList}
                handleClick={() => {
                  handleBlur()
                  setSearchValue('')
                  setSearchList([])
                }}
              ></DropDown>
            )}
          </div>
          <TopRLoginBtn user={currUser} onLogin={handleLoginBtn} />
        </div>
      </div>
    </Fragment>
  )
}

export default NavBar
