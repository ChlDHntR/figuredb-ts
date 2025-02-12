import React, { useNavigate } from 'react-router-dom'
import { FigureData } from '../interface.type/interface'

function DropDown({ data, handleClick }: any) {
  const navigate = useNavigate()
  return (
    <div className='DropDown'>
      <ul>
        {data.map((element: FigureData) => (
          <li
            onClick={(e) => {
              e.preventDefault()
              console.log(element.id)
              navigate(`/figure/${element.id}`)
              handleClick()
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
