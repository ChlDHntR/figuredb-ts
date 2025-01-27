import React, { createContext } from 'react'

export const PageIdContext = createContext<String | null | undefined>(null)

export default function PageIdProvider({children, value}: any) {

    return (
        <PageIdContext.Provider value={value}>
            {children}
        </PageIdContext.Provider>
    )
}