import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { e } from 'react-router/dist/development/route-data-Cq_b5feC'

export default function SearchFilter({ nameFilter, brandFilter, originalFilter, yearFilter, setFilterData }: any) {
  const handleClear = (attribute: string) => {
    setFilterData((prev: any) => ({ ...prev, [attribute]: '' }))
  }

  return (
    <div className='search-filter-wrapper'>
      <div className='search-filter-multi'>
        <div className='search-filter'>
          <div className='name'>フィギュア名</div>
          <div className='search-wrap box'>
            <div className='left-margin'>
              <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
            </div>
            <input
              type='text'
              value={nameFilter}
              onChange={(e) => setFilterData((prev: any) => ({ ...prev, name: e.target.value }))}
            />
            <div className='right-margin' onClick={() => handleClear('name')}>
              {nameFilter !== '' && <FontAwesomeIcon icon={faX as IconProp} />}
            </div>
          </div>
        </div>
        <div className='search-filter'>
          <div className='name'>ブランド名</div>
          <div className='search-wrap box'>
            <div className='left-margin'>
              <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
            </div>
            <input
              type='text'
              value={brandFilter}
              onChange={(e) => setFilterData((prev: any) => ({ ...prev, brand: e.target.value }))}
            />
            <div className='right-margin' onClick={() => handleClear('brand')}>
              {brandFilter !== '' && <FontAwesomeIcon icon={faX as IconProp} />}
            </div>
          </div>
        </div>
        <div className='search-filter'>
          <div className='name'>原作名</div>
          <div className='search-wrap box'>
            <div className='left-margin'>
              <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
            </div>
            <input
              type='text'
              value={originalFilter}
              onChange={(e) => setFilterData((prev: any) => ({ ...prev, original: e.target.value }))}
            />
            <div className='right-margin' onClick={() => handleClear('original')}>
              {originalFilter !== '' && <FontAwesomeIcon icon={faX as IconProp} />}
            </div>
          </div>
        </div>
        <div className='search-filter'>
          <div className='name'>発売年</div>
          <div className='search-wrap box'>
            <div className='left-margin'>
              <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
            </div>
            <input
              type='text'
              value={yearFilter}
              onChange={(e) => setFilterData((prev: any) => ({ ...prev, year: e.target.value }))}
            />
            <div className='right-margin' onClick={() => handleClear('year')}>
              {yearFilter !== '' && <FontAwesomeIcon icon={faX as IconProp} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
