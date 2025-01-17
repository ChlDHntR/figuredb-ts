import React, { createContext } from 'react'

export const UserAuthContext = createContext<any>(null)

export default function UserAuthProvider({children, value}: any) {

    return (
        <UserAuthContext.Provider value={value}>
            {children}
        </UserAuthContext.Provider>
    )
}