import React, { MouseEventHandler } from "react"
import { User } from "../interface.type/interface"

type Props = {
    user: User,
    onLogin: MouseEventHandler
}
export default function TopRLoginBtn({user, onLogin} : Props) {
    return (
        <div className="TopRLoginBtn">
            {
                user? 
                <p>{user.username}</p>
                : <div className="loginBtn" onClick={onLogin}>ログイン</div>
            }
        </div>
    )
}