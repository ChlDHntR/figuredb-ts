import React from 'react'
import { useNavigate } from 'react-router-dom'

function DropDown({ data, handleClick, activeUseNavigate }: any) {
  const navigate = useNavigate()
  return (
    <div className='DropDown'>
      <ul>
        {data.map((element: any) => (
          <li
            onClick={(e) => {
              e.preventDefault()
              if (activeUseNavigate) {
                navigate(`/figure/${element.id}`)
              }
              handleClick(element.id) // 2/14 Changed this to handleClick(element.id) to pass the id of the element to the parent component
            }}
            className='search_item'
            key={`${element.name}`}
          >
            <div className='DropDown_item'>
              <img src={element.image} alt='' />
              <p>{element.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { DropDown }
