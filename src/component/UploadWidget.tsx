import React, { useEffect, useRef } from 'react'
import server from '../axios/server'

declare global {
  interface Window {
    cloudinary: any
  }
}

const UploadWidget = ({ uwConfig, photoData }: any) => {
  const uploadWidgetRef = useRef<any>(null)
  const uploadButtonRef = useRef<any>(null)

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(uwConfig, (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            //console.log('Upload successful:', result.info)
            let newPhotoData = { ...photoData.current }
            newPhotoData.photoLinks.push(result.info.url)
            server.put(`UserPhotos/${photoData.current.id}`, newPhotoData).then((res: any) => {
              console.log(res)
            })
          }
        })

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current!.open()
          }
        }

        const buttonElement = uploadButtonRef.current

        buttonElement.addEventListener('click', handleUploadClick)

        // Cleanup
        return () => {
          buttonElement.removeEventListener('click', handleUploadClick)
        }
      }
    }

    initializeUploadWidget()
  }, [uwConfig])

  return (
    <div className='upload-widget box' ref={uploadButtonRef}>
      アップロード
    </div>
  )
}

export default UploadWidget
