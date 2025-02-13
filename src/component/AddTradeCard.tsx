import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { DropDown } from './DropDown'
import { InputBar } from './SearchBar'



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
      let newList = data.filter((element: any) => element.name.toLowerCase().includes(e.target.value.toLowerCase()))
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
        handleFocus={() => {return}}
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

export default function AddTradeCard({ figureData }: any) {
  const [itemList, setItemList] = useState<any>({ left: [], right: [] })
  const [showDrop, setShowDrop] = useState({ left: false, right: false })


  return (
    <div className="add-trade">
      <h3 className="heading">交換を追加</h3>
      <div className="trading-items">
        <div className="item-grid left">
          {itemList.left.map((item: any, index: number) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${figureData[item-1].image})` }}
              className="item-image"
            ></div>
          ))}
          <div className="new-item">
            <div className="item-image" style={{ textAlign: 'center' }} onClick={() => setShowDrop({ ...showDrop, left: !showDrop.left })}>
              <p>+</p>
            </div>
            {showDrop.left && <AddDropDown data={figureData} handleClick={(id: number) =>  { 
                let newArr = [...itemList.left, id]
                setItemList({...itemList, left: newArr})} }/>}
          </div>
        </div>
        <div className="arrow">
          <FontAwesomeIcon icon={faRightLong} />
        </div>
        <div className="item-grid right">
          {itemList.right.map((item: any, index: number) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${figureData[item].image})` }}
              className="item-image"
            ></div>
          ))}
        </div>
      </div>
      <div className="add-btn">
        <p>投稿</p>
      </div>
    </div>
  )
}
