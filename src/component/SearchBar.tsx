import React, { ChangeEventHandler, FocusEventHandler, useState } from 'react'

type Props = {
    className: string
    placeholder: string
    value: string 
    handleSearch: ChangeEventHandler
    handleFocus: FocusEventHandler
    //handleBlur:   FocusEventHandler

}

function InputBar({className, placeholder, value, handleSearch, handleFocus} : Props) {
    return (
        <input onFocus={handleFocus} value={value} placeholder={placeholder} className= {className} type="text" onChange={handleSearch} />
    )
}

export { InputBar }