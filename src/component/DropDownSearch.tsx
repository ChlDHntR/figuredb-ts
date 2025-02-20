import { useState, useCallback } from 'react'
import { InputBar } from './SearchBar'
import { DropDown } from './DropDown'

export default function DropDownSearch({ data, handleClick }: any) {
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
    <div className='searchBar_wrapper'>
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
      <div
        onClick={() => {
          setSearchValue('')
          setShowDrop(false)
        }}
      >
        {showDrop && <DropDown data={searchList} handleClick={handleClick} activeUseavigate={false}></DropDown>}
      </div>
    </div>
  )
}
