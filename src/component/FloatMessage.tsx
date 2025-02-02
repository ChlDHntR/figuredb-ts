import React, { useState, useContext, useRef, Children } from 'react'
import { FlashMessageContext } from '../context/FloatMessageProvider'
import FloatMessageProvider from '../context/FloatMessageProvider'

export default function FloatMessage({ children }: any) {
  const [messageOn, setMessageOn] = useState(false)
  const alertMessage = useRef('testing')
  const alertColorRef = useRef('')

  const messageAlert = (message: string, type: boolean) => {
    alertMessage.current = message
    alertColorRef.current = type ? 'green' : 'red'
    setMessageOn(true)
    setTimeout(() => {
      setMessageOn(false)
    }, 2000)
  }

  return (
    <FloatMessageProvider value={{ messageAlert }}>
      <div>
        {
          <div
            className={`flash_message  ${messageOn ? 'open' : 'close'}`}
            style={{ backgroundColor: alertColorRef.current }}
          >
            <p>{alertMessage.current}</p>
          </div>
        }
        {children}
      </div>
    </FloatMessageProvider>
  )
}
