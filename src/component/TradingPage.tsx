import React, { useEffect, useRef, useState } from 'react'
import server from '../axios/server'
import TradingCard from './TradeCard'
import { AnyTxtRecord } from 'dns'
import AddTradeCard from './AddTradeCard'

export default function TradingPage({ data }: any) {
  const tradeData = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [addTrade, setAddTrade] = useState(false)

  useEffect(() => {
    server.get('trades').then((res) => {
      tradeData.current = res.data
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <div className='comment_section box'>IS LOADING</div>
  return (
    <div className='trading-page'>
      <div className='wide'>
        {addTrade ?
          <AddTradeCard figureData={data} />
        : <div className="add-trade-btn box" style={{marginBottom: '20px'}} onClick={() => setAddTrade(true)}>
          <h3>Add trade</h3>
        </div>
        }
        {tradeData.current!.map((item: any) => (
          <TradingCard key={item.id} tradeInfo={{ ...item }} figureData={data} />
        ))}
      </div>
      <div className='side'></div>
    </div>
  )
}
