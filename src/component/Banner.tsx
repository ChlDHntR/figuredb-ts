import React, { useContext } from 'react'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LoginInitContext } from '../context/LoginInitProvider'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'


library.add(faChevronRight)

export default function Banner() {
  const setPopUp = useContext(LoginInitContext)
  const currUser = useSelector((state: RootState) => state.user.value)
  return (
    <div className='banner box'>
      <h1 className='heading'>フィギュアコレクションへのゲートウェイ</h1>
      <h2 className='sub-heading'>詳細情報・バリエーション・発売情報をチェック！</h2>
      <div className='feature-cards'>
        <div className='card'>
          <div className='image'></div>
          <div className='text'>
            <h3 className='card-header'>コレクター同士で交流しよう!</h3>
            <p className='card-content'>フィギュアについて語り合い、情報を共有し、コレクター仲間とつながる場。</p>
          </div>
        </div>
        <div className='card'>
          <div className='image'></div>
          <div className='text'>
            <h3 className='card-header'>お気に入りのフィギュアを見つけよう!</h3>
            <p className='card-content'>
              名前、シリーズ、メーカー、発売日などで検索して、求めているフィギュアを簡単に発見！
            </p>
          </div>
        </div>
        <div className='card'>
          <div className='image'></div>
          <div className='text'>
            <h3 className='card-header'>フィギュアの魅力を共有しよう!</h3>
            <p className='card-content'>
              {' '}
              公式画像から個人コレクションまで、高画質なフィギュア画像をアップロード＆閲覧！
            </p>
          </div>
        </div>
        <div className='card'>
          <div className='image'></div>
          <div className='text'>
            <h3 className='card-header'>コレクションを管理しよう!</h3>
            <p className='card-content'>所有フィギュア、欲しいフィギュア、お気に入りをリスト化して整理！</p>
          </div>
        </div>
      </div>
      {currUser === null && (
        <div onClick={() => setPopUp({ state: true, action: 'register' })} className='signup-btn'>
          <p>参加！</p>
          <div className='fa-icon-container'>
            <FontAwesomeIcon icon={faChevronRight as IconProp} />
          </div>
        </div>
      )}
    </div>
  )
}
