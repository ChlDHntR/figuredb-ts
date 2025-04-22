import { useEffect, useContext, useRef, useState } from 'react'
import server from '../axios/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FlashMessageContext } from '../context/FloatMessageProvider'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setUser } from '../features/userSlice/userSlice'

export default function ProfilePageList() {
  const currUser = useSelector((state: RootState) => state.user.value)
  const figureData = useRef<any[] | null>(null)
  const [forceRR, setForceRR] = useState({})
  const [showList, setShowList] = useState<any>({})
  const [isCreatingList, setIsCreatingList] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [nameEdit, setNameEdit] = useState('')
  const { messageAlert } = useContext(FlashMessageContext)
  const [isEditing, setIsEditing] = useState(() => {
    let listnameArr = Object.keys(currUser.list)
    return Object.fromEntries(listnameArr.map((listname) => [listname, false]))
  })
  const dispatch = useDispatch()

  useEffect(() => {
    server.get('figures').then((res: any) => {
      figureData.current = res.data
      setForceRR({})
    })
  }, [])

  const handleShowList = (listname: string) => {
    let newList = { ...showList }
    newList[listname] = !newList[listname]
    setShowList(newList)
  }

  const handleEditListName = (newName: string, oldName: string) => {
    if (newName === '') {
      messageAlert('コレクションの名前付けが必要です', false)
      return
    }

    let listnameArr = Object.keys(currUser.list)
    let arrNameCheck = listnameArr.map((name: string) => {
      if (name === oldName) {
        return
      }
      return name
    })

    if (arrNameCheck.includes(newName)) {
      messageAlert(`'${newName}'コレクションが存在しています`, false)
      return
    }

    for (let i = 0; i < listnameArr.length; i++) {
      if (listnameArr[i] === oldName) {
        listnameArr[i] = newName
        break
      }
    }
    let newList = Object.fromEntries(
      listnameArr.map((listname) => {
        if (listname === newName) return [listname, currUser.list[oldName]]
        return [listname, currUser.list[listname]]
      })
    )
    let thisUser = { ...currUser, list: newList }
    server.put(`users/${currUser.id}`, thisUser).then((res) => {
      dispatch(setUser(thisUser))
      messageAlert(`コレクションが編集されました！`, true)
    })

    //setForceRR({})
  }

  const handleDeleteList = (listName: string) => {
    let newList = {...currUser.list}
    delete newList[listName]
    let thisUser = { ...currUser, list: newList }
    server.put(`users/${currUser.id}`, thisUser).then((res) => {
      dispatch(setUser(thisUser))
      messageAlert(`コレクションが削除されました！`, true)
    })
  }

  const handleRemoveItem = (listName: string, index: number) => {
    let newList = {...currUser.list}
    let newListArray = [...newList[listName]]
    newListArray.splice(index, 1)
    newList[listName] = newListArray

    let thisUser = { ...currUser, list: newList}
    server.put(`users/${currUser.id}`, thisUser).then((res) => {
      dispatch(setUser(thisUser))
      messageAlert('アイテムが削除されました！', true)
    })
  }

  const handleCreateList = () => {
    if (inputRef.current!.value === '') {
      messageAlert('コレクションの名前が必要です', false)
    }
    let newlistName: string = inputRef.current?.value!
    let newListObject = {...currUser.list, [newlistName]: []}
    let thisUser = { ...currUser, list: newListObject }
    if (currUser.list[newlistName]) {
      messageAlert(`'${newlistName}'コレクションが存在しています`, false)
      return
    }
    dispatch(setUser(thisUser))
    server
      .put(`users/${currUser.id}`, thisUser)
      .then(messageAlert(`'${newlistName}'コレクションが作成されました！`, true))
   
  }

  return (
    <div className='profile-page-list'>
      <div className='userList box'>
        <div className='title'>
          <p>コレクションに追加</p>
        </div>
        {currUser ? (
          <div className='list_wrapper'>
            {Object.keys(currUser.list).map((listName) => (
              <div className='list' key={listName}>
                <div className='list_header'>
                  {!isEditing[listName] ? (
                    <p>{listName}</p>
                  ) : (
                    <>
                      <input type='text' value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} />
                    </>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      width: '2rem',
                      justifyContent: 'flex-end',
                      gap: '5px',
                    }}
                  >
                    {!isEditing[listName] && (
                      <div
                        className='caret_down'
                        style={showList[listName] ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}
                      >
                        <FontAwesomeIcon onClick={() => handleShowList(listName)} icon={faCaretDown} />
                      </div>
                    )}

                    <div
                      className='plus'
                      onClick={() => {
                        setNameEdit(listName)
                        setIsEditing((prev) => {
                          let listnameArr = Object.keys(currUser.list)
                          return Object.fromEntries(
                            listnameArr.map((listname) => {
                              if (listname === listName) {
                                return [listname, !prev[listname]]
                              }
                              return [listname, false]
                            })
                          )
                        })
                        let newList = { ...showList }
                        newList[listName] = true
                        setShowList(newList)
                      }}
                    >
                      {!isEditing[listName] ? (
                        <FontAwesomeIcon icon={faPenToSquare} />
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <div className='btn' style={{ display: 'flex', height: '100%', fontSize: '0.8rem' }}>
                            <button
                              onClick={() => handleDeleteList(listName)}
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                backgroundColor: 'red',
                                padding: '0 10px',
                                marginRight: '10px',
                                width: '60px',
                              }}
                            >
                              削除
                            </button>
                          </div>
                          <div className='btn' style={{ display: 'flex', height: '100%', fontSize: '0.8rem' }}>
                            <button
                              onClick={() => handleEditListName(nameEdit, listName)}
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                backgroundColor: 'green',
                                padding: '0 10px',
                                marginRight: '10px',
                              }}
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {showList[listName] &&
                  currUser.list[listName].map((item: any, index: number) => (
                    <div className='list_item' key={item}>
                      <div className='info'>
                        <img src={figureData.current![item - 1].image} alt='' />
                        <p>{figureData.current![item - 1].name}</p>
                      </div>
                      {isEditing[listName] && (
                        <button
                          onClick={() => handleRemoveItem(listName, index)}
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            backgroundColor: 'red',
                            padding: '0 10px',
                            margin: '0',
                          }}
                        >
                          X
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            ))}
            {isCreatingList && (
              <div className='list create'>
                <input type='text' ref={inputRef} />
                <div className='btn' style={{ display: 'flex' }}>
                  <button
                    onClick={handleCreateList}
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      backgroundColor: 'green',
                      height: '2rem',
                      padding: '0 10px',
                      margin: '0 10px',
                    }}
                  >
                    作成
                  </button>
                  <button
                    onClick={() => setIsCreatingList(false)}
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      backgroundColor: 'red',
                      height: '2rem',
                      padding: '0 10px',
                      margin: '0',
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className='notLogin'>ログインしてください</p>
        )}
        {!isCreatingList && currUser && (
          <div
            onClick={() => {
              setIsCreatingList((prev) => !prev)
            }}
            className='createList'
          >
            <p>コレクション作成</p>
            <div className='fa-plus'>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
