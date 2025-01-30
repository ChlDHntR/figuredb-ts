import React, { createContext } from "react";

export const FlashMessageContext = createContext<any>(null)

export default function FlashMessageProvider({value, children}: any) {
    return (
        <FlashMessageContext.Provider value={value}>
            {children}
        </FlashMessageContext.Provider>
    )
}