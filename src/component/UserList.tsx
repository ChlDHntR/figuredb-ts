import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import server from '../axios/server'
import { PageIdContext } from '../context/PageIdProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import {
  faLessThanEqual,
  faPlus,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons'
import { FlashMessageContext } from '../context/FloatMessageProvider'

library.add(faPlus)
library.add(faCaretDown)

export default function UserList({ data, currUser }: any) {
  const [showList, setShowList] = useState<any>({})
  const [isCreatingList, setIsCreatingList] = useState(false)
  const [forceReRen, setForceReRen] = useState({})
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useContext(PageIdContext)
  const { messageAlert } = useContext(FlashMessageContext)

  useEffect(() => {
    if (currUser) {
      let listObj: any = {}
      let listObjKey = Object.keys(currUser.list)
      listObjKey.forEach((listname) => (listObj[listname] = false))
      setShowList(listObj)
    }
  }, [])

  const handleShowList = (listname: string) => {
    let newList = { ...showList }
    newList[listname] = !newList[listname]
    setShowList(newList)
  }

  const handleCreateList = () => {
    if (inputRef.current!.value === '') {
      messageAlert('List name can not be blank', false)
    }
    let newlistName: string = inputRef.current?.value!
    let thisUser = { ...currUser }
    if (currUser.list[newlistName]) {
      messageAlert(`'${newlistName}'コレクションが存在しています`)
      return
    }
      thisUser.list[newlistName] = []
      console.log(thisUser.list)
      server.put(`users/${currUser.id}`, thisUser).then(
        messageAlert(`'${newlistName}'コレクションがさくせいされました！`, true)
      )
      setForceReRen({})
  }

  const handleAddToList = (listname: string) => {
    let updateUserList = { ...currUser }
    console.log(updateUserList.list[listname].includes(id))
    if (updateUserList.list[listname].includes(Number(id))) {
      messageAlert('Item existed in list', false)
      return
    }
    updateUserList.list[listname].push(Number(id))
    server.put(`users/${currUser.id}`, updateUserList)
    setForceReRen({})
    messageAlert('Item successfully added to list', true)
  }

  return (
    <div className="userList box">
      <div className="title">
        <p>コレクションに追加</p>
      </div>
      {currUser ? (
        <div className="list_wrapper">
          {Object.keys(currUser.list).map((listName) => (
            <div className="list" key={listName}>
              <div className="list_header">
                <p>{listName}</p>
                <div
                  style={{
                    display: 'flex',
                    width: '2rem',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    className="plus"
                    onClick={() => handleAddToList(listName)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                  <div
                    className="caret_down"
                    style={
                      showList[listName]
                        ? { transform: 'rotate(180deg)' }
                        : { transform: 'rotate(0deg)' }
                    }
                  >
                    <FontAwesomeIcon
                      onClick={() => handleShowList(listName)}
                      icon={faCaretDown as IconProp}
                    />
                  </div>
                </div>
              </div>
              {showList[listName] &&
                currUser.list[listName].map((item: any) => (
                  <div className="list_item" key={item}>
                    <img src={data[item - 1].image} alt="" />
                    <p>{data[item - 1].name}</p>
                  </div>
                ))}
            </div>
          ))}
          {isCreatingList && (
            <div className="list create">
              <input type="text" ref={inputRef} />
              <div className="btn" style={{display: 'flex'
              }}>
                <button onClick={handleCreateList} style={{color: 'white', fontWeight: 'bold', backgroundColor: 'green', height: '2rem', padding: '0 10px', margin: '0 10px'}}>作成</button>
                <button onClick={() => setIsCreatingList(false)} style={{color: 'white', fontWeight: 'bold', backgroundColor: 'red', height: '2rem', padding: '0 10px', margin: '0'}}>X</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1 className="notLogin">NOT LOGGED IN</h1>
      )}
      {!isCreatingList && (
        <div
          onClick={() => {
            setIsCreatingList((prev) => !prev)
          }}
          className="createList"
        >
          <p>コレクション作成</p>
          <div className='fa-plus'>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      )}
    </div>
  )
}
