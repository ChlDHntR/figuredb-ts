import React, { useEffect, useRef, useState } from "react";
import server from "../axios/server";
import TradingCard from "./TradeCard";
import { AnyTxtRecord } from "dns";

export default function TradingPage({data}: any) {
    const tradeData = useRef<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        server.get('trades')
        .then(res => {
            tradeData.current = res.data
            setIsLoading(false)
            console.log(tradeData.current)
        })
    }, [])

    if (isLoading) return <div className='comment_section box'>IS LOADING</div>

    return (
        <div className="trading-page">
            <div className="wide box">
                {
                    tradeData.current!.map((item: any) => 
                        <TradingCard key={item.id} tradeInfo={{...item}} figureData={data}/>
                    )
                }
            </div>
            <div className="side"></div>
        </div>
    )
}