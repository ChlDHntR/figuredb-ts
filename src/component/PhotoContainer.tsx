import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import server from '../axios/server'

export default function PhotoContainer() {
  let param = useParams()
  console.log(param.id)
  const [isLoading, setIsLoading] = useState(true)
  const photoData = useRef<Array<any> | null>(null)

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

  if (isLoading)
    return (
      <div className="photo-container box">
        <div className="title">
          <p>写真集</p>
        </div>
        <p>LOADING</p>
      </div>
    )

  return (
      <div className="photo-container box">
        <div className="title">
          <p>写真集</p>
        </div>
        <div
          className="photo-grid-wrapper"
          style={{ overflowY: photoData.current![12] ? 'scroll' : 'hidden' }}
        >
          <section className="photo-grid">
            {photoData.current!.map((link, index) => (
              <img key={index} src={link} />
            ))}
          </section>
        </div>
      </div>
  )
}
