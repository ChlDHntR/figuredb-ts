import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const UploadWidget = ({ uwConfig}: any) => {
  const uploadWidgetRef = useRef<any>(null);
  const uploadButtonRef = useRef<any>(null);

  useEffect(() => {
    const initializeUploadWidget = () => {
      console.log(window)
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error: any, result: any) => {
            if (!error && result && result.event === 'success') {
              console.log('Upload successful:', result.info);
              //setPublicId(result.info.public_id);
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current!.open();
          }
          console.log('click')
        };

        const buttonElement = uploadButtonRef.current;
        console.log('buttonElement')
        buttonElement.addEventListener('click', handleUploadClick);
        console.log('event listener added');

        // Cleanup
        return () => {
          buttonElement.removeEventListener('click', handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig]);

  return (
    <div className="upload-widget box" ref={uploadButtonRef}>
      アップロード
    </div>
  );
};

export default UploadWidget;