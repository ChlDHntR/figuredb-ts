import React, { useState, useCallback, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { DropDown } from './DropDown'
import { InputBar } from './SearchBar'
import { FlashMessageContext } from '../context/FloatMessageProvider'
import { UserAuthContext } from '../context/UserAuthProvider'
import server from '../axios/server'

const months = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '1月',
  '12月',
]

function AddDropDown({ data, handleClick }: any) {
  const [searchValue, setSearchValue] = useState('')
  const [showDrop, setShowDrop] = useState(false)
  const [searchList, setSearchList] = useState<any>([])

  const handleSearch = useCallback(
    (e: any) => {
      setSearchValue(e.target.value)
      if (e.target.value === '') {
        setShowDrop(false)
        return
      }
      let newList = data.filter((element: any) =>
        element.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setSearchList([...newList])
      //   if (newList.length >= 8) {
      //     setShowDrop(true)
      //   } else {
      setShowDrop(true)
      // }
    },
    [data]
  )

  return (
    <div className="searchBar_wrapper">
      <InputBar
        value={searchValue}
        placeholder={'キーワード検索🔍'}
        className={'searchBar'}
        handleSearch={handleSearch}
        handleFocus={() => {
          return
        }}
        //handleBlur={handleBlur}
      ></InputBar>
      {showDrop && (
        <DropDown
          data={searchList}
          handleClick={handleClick}
          activeUseavigate={false}
        ></DropDown>
      )}
    </div>
  )
}

export default function AddTradeCard({
  figureData,
  setAddTrade,
  forceReRender,
}: any) {
  const [itemList, setItemList] = useState<any>({ left: [], right: [] })
  const [showDrop, setShowDrop] = useState({ left: false, right: false })
  const { currUser } = useContext(UserAuthContext)
  const { messageAlert } = useContext(FlashMessageContext)

  const handleUploadOffer = () => {
    let date = new Date()
    let uploadDate = `${date.getFullYear()}, ${
      months[date.getMonth()]
    } ${String(date.getDay()).padStart(2, '0')}, ${String(
      date.getHours()
    ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    let offer = {
      poster: currUser.username,
      have: itemList.left,
      want: itemList.right,
      time: uploadDate,
      status: 'open',
    }
    server.post('trades', offer).then((res: any) => {
      messageAlert('オッファーを投稿しました', true)
      setAddTrade(false)
      forceReRender()
    })
  }

  const handleCancel = () => {
    setAddTrade(false)
  }
  
  return (
    <div className="add-trade box">
      <h3 className="heading">交換オッファーを作成</h3>
      <div className="trading-items">
        <div className="item-grid left">
          {itemList.left.map((item: any, index: number) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${figureData[item - 1].image})` }}
              className="item-image"
            ></div>
          ))}
          <div className="new-item">
            <div
              className="item-image"
              style={{ textAlign: 'center' }}
              onClick={() => setShowDrop({ ...showDrop, left: !showDrop.left })}
            >
              <p>+</p>
            </div>
            {showDrop.left && (
              <AddDropDown
                data={figureData}
                handleClick={(id: number) => {
                  let newArr = [...itemList.left, id]
                  setItemList({ ...itemList, left: newArr })
                  setShowDrop({ ...showDrop, left: false })
                }}
              />
            )}
          </div>
        </div>
        <div className="arrow">
          <FontAwesomeIcon icon={faRightLong} />
        </div>
        <div className="item-grid right">
          {itemList.right.map((item: any, index: number) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${figureData[item - 1].image})` }}
              className="item-image"
            ></div>
          ))}
          <div className="new-item">
            <div
              className="item-image"
              style={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              onClick={() =>
                setShowDrop({ ...showDrop, right: !showDrop.right })
              }
            >
              <p>+</p>
            </div>
            {showDrop.right && (
              <AddDropDown
                data={figureData}
                handleClick={(id: number) => {
                  let newArr = [...itemList.right, id]
                  setItemList({ ...itemList, right: newArr })
                  setShowDrop({ ...showDrop, right: false })
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="op-btn">
        <div className="add-btn" onClick={handleUploadOffer}>
          <p>投稿</p>
        </div>
        <div className="cancel-btn" onClick={handleCancel}>
          <p>キャンセル</p>
        </div>
      </div>
    </div>
  )
}
