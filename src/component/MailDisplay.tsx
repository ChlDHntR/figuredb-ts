import { useEffect } from 'react'

export default function MailDisplay({ mails }: any) {
  if (!mails) return <div>Loading...</div>

  return (
    <div className='mail-container'>
      {mails.map((mail: any, index: number) => (
        <div key={index} className='mail-item'>
          <p className='mail-sender'>
            <strong>From:</strong> {mail.from}
          </p>
          <p className='mail-receiver'>
            <strong>To:</strong> {mail.to}
          </p>
          <p className='mail-content'>{mail.content}</p>
          <p className='mail-date'>{mail.date}</p>
        </div>
      ))}
    </div>
  )
}
