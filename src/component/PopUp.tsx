import React, { MouseEventHandler } from "react"

interface props  {
  handleClose: MouseEventHandler,
  children: React.ReactNode
}

function PopUp({ handleClose, children } : props) {
  return (
    <div className='PopUp_wrapper'>
      <div className='background' onClick={handleClose}></div>
      {children}
    </div>
  )
}

export { PopUp }
