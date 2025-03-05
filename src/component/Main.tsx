import React, { useEffect, useRef, useState } from 'react'
import { Slider } from './Slider'
import { PopUp } from './PopUp'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { faComments, faFire, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
} from '@fortawesome/fontawesome-svg-core'
import SearchFilter from './SearchFilter'
import Banner from './Banner'
import SearchFilterResult from './SearchFilterResult'
import { useAsyncError } from 'react-router-dom'

library.add(faFire)
library.add(faStar)

function Main({ data }: any) {
  const [isFilterSearching, setIsFilterSearching] = useState(false)
  const [filterData, setFilterData] = useState({
    name: '',
    brand: '',
    original: '',
    year: '',
  })
  const [filterResult, setFilterResult] = useState<any>([])
  const thisYearList = useRef<any[]>(
    data.filter((item: any) => item.date.includes('2025'))
  )
  const sliderList1 = useRef<any[] | null>(null)
  const [forceRR, setForceRR] = useState({})

  useEffect(() => {
    if (
      filterData.brand === '' &&
      filterData.name === '' &&
      filterData.original === '' &&
      filterData.year === ''
    ) {
      setIsFilterSearching(false)
      return
    }
    setIsFilterSearching(true)
    let result = data.filter((item: any) => {
      return (
        item.name.toLowerCase().includes(filterData.name.toLowerCase()) &&
        item.brand.toLowerCase().includes(filterData.brand.toLowerCase()) &&
        item.series.toLowerCase().includes(filterData.original.toLowerCase()) &&
        item.date.toLowerCase().includes(filterData.year.toLowerCase())
      )
    })
    setFilterResult(result)
  }, [filterData])

  useEffect(() => {
    const list1: any[] = []
    const set1 = new Set<any>([])
    for (let i = 0; set1.size <= 14; i++) {
      let random = Math.round(Math.random() * (data.length - 1))
      if (set1.has(random)) {
        continue
      }
      set1.add(random)
    }
    set1.forEach((value) => list1.push(data[value]))
    sliderList1.current = list1
    setForceRR({})
  }, [])

  // const list1: any = []
  // const set1 = new Set<any>([])
  // for (let i = 0; set1.size <= 14; i++) {
  //   let random = Math.round(Math.random() * (data.length - 1))
  //   if (set1.has(random)) {
  //     continue
  //   }
  //   set1.add(random)
  // }
  // set1.forEach((value) => list1.push(data[value]))

  return (
    <div className="Main_wrapper">
      <Banner />
      <SearchFilter
        nameFilter={filterData.name}
        brandFilter={filterData.brand}
        originalFilter={filterData.original}
        yearFilter={filterData.year}
        setFilterData={setFilterData}
      />
      {isFilterSearching ? (
        <SearchFilterResult data={filterResult} />
      ) : (
        <>
          <div className="buffer" style={{ height: '2rem' }}></div>
          <div className="popular_slider">
            <h1>
              <FontAwesomeIcon icon={faFire as IconProp} />
              人気{'>'}{' '}
            </h1>
            { 
              sliderList1.current === null ? 
              <h1>Loading</h1>
              :
              <Slider data={sliderList1.current} interval={2000}></Slider>
            }
          </div>
          <div className="popular_slider">
            <h1>
              <FontAwesomeIcon icon={faStar as IconProp} />
              今年発売{'>'}{' '}
            </h1>
            <Slider data={thisYearList.current} interval={2500}></Slider>
          </div>
        </>
      )}

      {/* {popUpData && <PopUp props={popUpData} handleClose={() => setShowPopUp({ show: false, data: '' })}></PopUp>} */}
    </div>
  )
}

export default Main
