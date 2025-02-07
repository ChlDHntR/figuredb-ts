import React, { useNavigate } from 'react-router-dom'

export default function GeneralDropDown({ children }: any) {
  const navigate = useNavigate()
  return <div className='DropDown box'>{children}</div>
}
