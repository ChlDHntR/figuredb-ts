import React, { useState, useEffect } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import UploadWidgets from './UploadWidget'

export default function UploadPage({ data }: any) {
  const [publicId, setPublicId] = useState<any>(null)
  const cloudName = 'hzxyensd5'
  const uploadPreset = 'aoh4fpwm'
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  })

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
    <div className="upload-page box">
        <div className="figure-choose">
            <div className="searh-bar">
                <input type="text" placeholder="Search for figures" />
            </div>
        </div>
      <UploadWidgets uwConfig={uwConfig}/>

    </div>
  )
}
