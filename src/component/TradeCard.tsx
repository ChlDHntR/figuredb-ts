import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import GeneralDropDown from './GeneralDropDown'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function TradingCard({ tradeInfo, figureData, handleWriteMail }: any) {
  const [showDrop, setShowDrop] = useState({ left: null, right: null })
  const leftList = [...tradeInfo.have]
  const rightList = [...tradeInfo.want]
  const currUser = useSelector((state: RootState) => state.user.value)

  const handleMouseEnter = (key: number, side: string) => {
    setShowDrop((prev) => ({ ...prev, [side]: key }))
  }

  const handleMouseLeave = () => {
    setShowDrop({ left: null, right: null })
  }

  const itemMap = (itemlist: Array<number>, side: string) =>
    itemlist.map((item: number, index: number) => (
      <div
        key={index}
        onMouseEnter={() => handleMouseEnter(index, side)}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundImage: `url(${figureData[item - 1].image})` }}
        className='item-image'
      >
        {/* <img src={image} alt="" /> */}
        {showDrop[side as keyof typeof showDrop] === index && (
          <GeneralDropDown>
            <div className='figure-general-info'>
              <div className='image'>
                <img src={figureData[item - 1].image} alt='' />
              </div>
              <p>{figureData[item - 1].name}</p>
              <a href={`/figure/${item * 1}`} target='_blank' rel='noopener noreferrer'>
                詳細
              </a>
            </div>
          </GeneralDropDown>
        )}
      </div>
    ))

  return (
    <div className='trading-card-wrapper box'>
      <div className='trading-card'>
        <div className='header'>
          <h3 className='poster'>
            {tradeInfo.poster}
            {currUser && tradeInfo.poster !== currUser.username && (
              <FontAwesomeIcon
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  handleWriteMail(tradeInfo.poster)
                }}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
                icon={faEnvelope}
              />
            )}
          </h3>
          <p className='date'>{tradeInfo.time}</p>
        </div>
        <div className='trading-items'>
          <div className='item-grid left'>{itemMap(leftList, 'left')}</div>
          <div className='arrow'>
            <FontAwesomeIcon icon={faRightLong} />
          </div>
          <div className='item-grid right'>{itemMap(rightList, 'right')}</div>
        </div>
      </div>
    </div>
  )
}
