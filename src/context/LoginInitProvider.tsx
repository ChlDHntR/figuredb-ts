import React, { createContext } from 'react'

export const LoginInitContext = createContext<any>(null)

export default function LoginInitProvider({ value, children }: any) {
  return <LoginInitContext.Provider value={value}>{children}</LoginInitContext.Provider>
}
