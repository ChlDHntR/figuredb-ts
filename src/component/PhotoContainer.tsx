import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import server from '../axios/server'
import { PopUp } from './PopUp'

export default function PhotoContainer() {
  let param = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const photoData = useRef<Array<any> | null>(null)
  const [imageView, setImageView] = useState(false)
  const [viewLink, setViewLink] = useState('')

  useEffect(() => {
    server.get(`UserPhotos/${param.id}`).then((res) => {
      photoData.current = res.data.photoLinks
      setIsLoading(false)
    })
  }, [])

  // let genData = []
  // for (let i = 1; i <= 32; i++) {
  //   genData.push({
  //     id: `${i}`,
  //     photoLinks: [],
  //   })
  // }

  // console.log(JSON.stringify(genData))

  const handleViewImage = (link: string) => {
    setImageView(true)
    setViewLink(link)
  }

  if (isLoading)
    return (
      <div className='photo-container box'>
        <div className='title'>
          <p>写真集</p>
        </div>
        <p>LOADING</p>
      </div>
    )

  return (
    <div className='photo-container box'>
      {imageView && (
        <PopUp handleClose={() => setImageView(false)}>
          <div className='image-container'>
            <img src={viewLink} alt='' />
          </div>
        </PopUp>
      )}
      <div className='title'>
        <p>写真集</p>
      </div>
      <div className='photo-grid-wrapper' style={{ overflowY: photoData.current![12] ? 'scroll' : 'hidden' }}>
        <section className='photo-grid'>
          {photoData.current!.map((link, index) => (
            <img key={index} src={link} onClick={() => handleViewImage(link)} />
          ))}
        </section>
      </div>
    </div>
  )
}
