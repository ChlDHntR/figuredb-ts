import React, { useState, useEffect, useRef } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import UploadWidgets from './UploadWidget'
import DropDownSearch from './DropDownSearch'
import server from '../axios/server'
import { image } from '@cloudinary/url-gen/qualifiers/source'

export default function UploadPage({ data }: any) {
  const [publicId, setPublicId] = useState<any>(null)
  const photoData = useRef<any>(null)
  const cloudName = 'deiobgalh'
  const uploadPreset = 'ml_default'
  const [ChosenFigureId, setChosenFigureId] = useState<any>(null)
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  })

  useEffect(() => {
    if (!ChosenFigureId) return
    server.get(`UserPhotos/${ChosenFigureId}`).then((res: any) => {
      photoData.current = res.data
    })
  }, [ChosenFigureId])
  const handleChooseFigClick = (id: string) => {
    setChosenFigureId(id)
  }

  const uwConfig = {
    cloudName,
    uploadPreset,
    // Uncomment and modify as needed:
    // cropping: true,
    // showAdvancedOptions: true,
    // sources: ['local', 'url'],
    // multiple: false,
    // folder: 'user_images',
    // tags: ['users', 'profile'],
    // context: { alt: 'user_uploaded' },
    // clientAllowedFormats: ['images'],
    // maxImageFileSize: 2000000,
    // maxImageWidth: 2000,
    // theme: 'purple',
  }

  return (
    <div className='upload-page box'>
      <div className='figure-choose'>
        <h3>どのフィギュアの写真をアップロードしたいですか？</h3>

        <DropDownSearch data={data} handleClick={handleChooseFigClick} />
        {ChosenFigureId && (
          <div className='chosen-figure'>
            <img src={data[ChosenFigureId - 1].image} alt={data[ChosenFigureId - 1].name} />
            <div className='info'>
              <p className='name'>{data[ChosenFigureId - 1].name}</p>
              <p className='more'>ブランド: {data[ChosenFigureId - 1].brand}</p>
              <p className='more'>原作名: {data[ChosenFigureId - 1].series}</p>
              <div className='link'>
                <a href={`/figure/${ChosenFigureId}`} target='_blank' rel='noopener noreferrer'>
                  詳細ページへ
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <UploadWidgets uwConfig={uwConfig} photoData={photoData} />
    </div>
  )
}
