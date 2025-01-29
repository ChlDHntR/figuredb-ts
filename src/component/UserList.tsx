import React, { useContext, useEffect, useRef, useState } from 'react'
import server from '../axios/server'
import { User } from '../interface.type/interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { faLessThanEqual, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus)
library.add(faCaretDown)

export default function UserList({ data, currUser }: any) {
  const [showList, setShowList] = useState<any>({})
  const [isCreatingList, setIsCreatingList] = useState(false)
  const [forceReRen, setForceReRen] = useState({})
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (currUser) {
      let listObj: any = {}
      let listObjKey = Object.keys(currUser.list)
      listObjKey.forEach((listname) => (listObj[listname] = false))
      console.log('run')
      setShowList(listObj)
    }
  }, [])

  const handleShowList = (listname: string) => {
    let newList = { ...showList }
    newList[listname] = !newList[listname]
    setShowList(newList)
  }

  const handleCreateList = () => {
    let newlistName: string = inputRef.current?.value!
    let thisUser = { ...currUser }
    if (!currUser.list[newlistName]) {
      thisUser.list[newlistName] = []
      console.log(thisUser.list)
      server.put(`users/${currUser.id}`, thisUser)
      setForceReRen({})
    }
  }

  return (
    <div className='userList box'>
      <div className='title'>
        <p>MANAGE LIST</p>
      </div>
      {currUser ? (
        <div className='list_wrapper'>
          {Object.keys(currUser.list).map((listName) => (
            <div className='list' key={listName}>
              <div className='list_label'>
                <p>{listName}</p>
                <div className='caret_down'>
                  <FontAwesomeIcon
                    onClick={() => handleShowList(listName)}
                    icon={faCaretDown as IconProp}
                  ></FontAwesomeIcon>
                </div>
              </div>
              {showList[listName] &&
                currUser.list[listName].map((item: any) => (
                  <div className='list_item' key={item}>
                    <img src={data[item - 1].image} alt='' />
                    <p>{data[item - 1].name}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <h1 className='notLogin'>NOT LOGGED IN</h1>
      )}
      {isCreatingList &&
        (currUser ? (
          <div className='createList_input'>
            <input type='text' ref={inputRef} />
            <button onClick={handleCreateList}>ADD</button>
          </div>
        ) : (
          <span>PLS LOGIN</span>
        ))}
      <div
        onClick={() => {
          setIsCreatingList((prev) => !prev)
        }}
        className='createList'
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  )
}
