import { useEffect, useRef, useState, useContext } from 'react'
import server from '../axios/server'
import TradingCard from './TradeCard'
import { AnyTxtRecord } from 'dns'
import AddTradeCard from './AddTradeCard'
import { UserAuthContext } from '../context/UserAuthProvider'
import { FlashMessageContext } from '../context/FloatMessageProvider'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '1月', '12月']

export default function TradingPage({ data }: any) {
  const tradeData = useRef<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [addTrade, setAddTrade] = useState(false)
  const [frieren, setFrieren] = useState({})
  const [reversedData, setReversedData] = useState<any>([])
  const [toWho, setToWho] = useState('')
  const textareRef = useRef<HTMLTextAreaElement | null>(null)
  const [isWritingMail, setIsWritingMail] = useState(false)
  const currUser = useSelector((state: RootState) => state.user.value)
  const { messageAlert } = useContext(FlashMessageContext)

  useEffect(() => {
    server.get('trades').then((res) => {
      tradeData.current = res.data
      setIsLoading(false)
      let dummyData = [...tradeData.current!].reverse()
      setReversedData(dummyData)
    })
  }, [frieren])

  const handleAddTradeBtn = () => {
    if (!currUser) {
      messageAlert('ログインしてください', false)
      return
    }
    setAddTrade(true)
  }

  const handleWriteMail = (name: string) => {
    setToWho(name)
    setIsWritingMail(true)
  }

  const handleSendMail = () => {
    if (textareRef.current!.value === '') {
      messageAlert('メールの内容は空白にできません', false)
      return
    }

    let date = new Date()
    let sendDate = ` ${date.getFullYear()}, ${months[date.getMonth()]} ${String(date.getDay()).padStart(
      2,
      '0'
    )}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

    let newMailObj = {
      id: Date.now(),
      from: currUser.username,
      to: toWho,
      content: textareRef.current?.value,
      date: sendDate,
    }

    server.post('mails', newMailObj).then((res) => {
      messageAlert('メール送信しました', true)
    })
  }

  if (isLoading) return <div className='comment_section box'>IS LOADING...</div>
  return (
    <div className='trading-page'>
      <div className='wide'>
        {addTrade ? (
          <AddTradeCard figureData={data} setAddTrade={setAddTrade} forceReRender={() => setFrieren({})} />
        ) : (
          <div className='add-trade-btn box' style={{ marginBottom: '20px' }} onClick={handleAddTradeBtn}>
            <h3>交換オッファーを作成</h3>
          </div>
        )}
        {reversedData.map((item: any) => (
          <TradingCard key={item.id} tradeInfo={{ ...item }} figureData={data} handleWriteMail={handleWriteMail} />
        ))}
      </div>
      <div className='side'>
        {isWritingMail && (
          <div className='mail-compose-wrapper box'>
            <div className='title'>
              <p>メール作成</p>
            </div>
            <div className='mail-wrapper'>
              <div className='header'>
                <div className='from' style={{ display: 'flex' }}>
                  <p>From:</p>
                  <p style={{ fontWeight: 'bold', marginLeft: '10px', fontSize: '1rem' }}>{currUser.username}</p>
                </div>
                <div className='to' style={{ display: 'flex' }}>
                  <p>To: </p>
                  <p style={{ fontWeight: 'bold', marginLeft: '10px', fontSize: '1rem' }}>{toWho}</p>
                </div>
              </div>
              <div className='content-field'>
                <textarea ref={textareRef} name='' id='' placeholder='オッファーに興味をもっています。。。'></textarea>
              </div>
            </div>
            <div className='send-btn' onClick={handleSendMail}>
              <p>送信</p>
            </div>
            <div className='cancel-btn' onClick={() => setIsWritingMail(false)}>
              <p>キャンセル</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
