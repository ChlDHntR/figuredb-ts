import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function GeneralDropDown({ children, customClassName }: any) {
  const navigate = useNavigate()
  return <div className={`DropDown box ${customClassName}`}>{children}</div>
}
