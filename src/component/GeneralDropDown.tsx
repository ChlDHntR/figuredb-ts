import React, { useNavigate } from 'react-router-dom'

export default function GeneralDropDown({ children, handleClick }: any) {
  const navigate = useNavigate()
  return <div className='DropDown'>{children}</div>
}
