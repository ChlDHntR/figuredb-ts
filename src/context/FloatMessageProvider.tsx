import React, { createContext } from 'react'

export const FlashMessageContext = createContext<any>(null)

export default function FloatMessageProvider({ value, children }: any) {
  return <FlashMessageContext.Provider value={value}>{children}</FlashMessageContext.Provider>
}
