import React, { useContext, useEffect, useRef, useState } from 'react'
import server from '../axios/server'
import { User } from '../interface.type/interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus)

export default function UserList({ data, currUser }: any) {
    const [showList, setShowList] = useState<any>({})
    
    useEffect(() => {
        if (currUser) {
            let listObj: any = {}
            let listObjKey = Object.keys(currUser.list)
            
            listObjKey.forEach((listname) => listObj[listname] = false)
            
            setShowList(listObj)
        }
        console.log(showList)
    }, [])

    const handleShowList = (listname: string) => {
        let newList = {...showList}
        newList[listname] = !newList[listname]
        setShowList(newList)
    }
    
    return (
        <div className='userList box'>
            <div className="title">
                <p>LIST MANAGEMENT</p>
            </div>
            {
                currUser?
                <div className="list_wrapper">
                    {
                        Object.keys(currUser.list).map(listName => <div className='list' key={listName}>
                            <div>
                                <p>{listName}</p> 
                                <button onClick={() => handleShowList(listName)}>show</button>   
                            </div>
                            {
                            showList[listName] &&
                            currUser.list[listName].map(
                                (item: any) => <div className="list_item" key={item}>
                                        <img src={data[item-1].image} alt="" />
                                        <p>{data[item-1].name}</p>
                                </div>
                            )}
                            </div>)
                    }
  
                </div>
                :<h1 className='notLogin'>NOT LOGGED IN</h1>
            }
            <div className="createList">
                <FontAwesomeIcon icon={faPlus}/>
            </div>
        </div>
    ) 
}