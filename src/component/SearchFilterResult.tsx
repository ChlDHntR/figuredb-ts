import React from 'react'

export default function SearchFilterResult({ data }: any) {
  return (
    <div className='filterResult-wrapper'>
      <h2 style={{ width: '1250px', margin: '0 auto' }}>検索結果 : </h2>
      <div className='filterResult'>
        {data.map((item: any) => {
          return (
            <div className='result-item' key={item.id}>
              <img draggable={false} src={item.image} alt='' />
              <div className='result_item_info'>
                <p className='name'>{item.name}</p>
                <div style={{ padding: '0 5px' }}>
                  <div className='series'>{item.series}</div>
                  <div className='brand'>{item.brand}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
