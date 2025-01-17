import React, { Fragment, useLayoutEffect, useRef, useEffect, useState, createContext, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CommentSect from './CommentSect.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { UserAuthContext } from '../context/UserAuthProvider'
import { User } from '../interface.type/interface.ts'

export const PageIdContext = createContext<String | null | undefined>(null)

export default function FigurePage({ data }: any) {
  const id = useParams().id
  const testData = data.find((element: any) => element.id == id)
  const body = useRef(null)
  const side = useRef(null)
  const { currUser } = useContext<any>(UserAuthContext)

  // useLayoutEffect(() => {
  //   let left = body.current.getBoundingClientRect().left
  //   console.log(left)
  //   side.current.style.right = `${left}px`
  // })
  return (
    <div className='figure_page' ref={body}>
      <div className='wide'>
        <div className='figureData_wrapper box'>
          <div className='figure_name'>
            <p>{testData.name}</p>
          </div>
          <div className='figureData'>
            <div className='figure_image'>
              <img src={'data:image/png;base64,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'} alt={`${testData.name} image`} />
            </div>
            <div className='figure_info'>
              <table>
                <tbody>
                  <tr>
                    <th>ブランド名</th>
                  </tr>
                  <tr>
                    <td>{testData.brand}</td>
                  </tr>
                  <tr>
                    <th>発売日</th>
                  </tr>
                  <tr>
                    <td>{testData.date}</td>
                  </tr>
                  <tr>
                    <th>原作名</th>
                  </tr>
                  <tr>
                    <td>{testData.series}</td>
                  </tr>
                  <tr>
                    <th>参考価格</th>
                  </tr>
                  <tr>
                    <td>{testData.price}円</td>
                  </tr>
                  <tr>
                    <th>素材</th>
                  </tr>
                  <tr>
                    <td>PVC/ABS</td>
                  </tr>
                  <tr>
                    <th>解説</th>
                  </tr>
                  <tr>
                    <td>{testData.about}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <PageIdContext.Provider value={id}>
          <CommentSect />
        </PageIdContext.Provider>
      </div>
      <div className='side box' ref={side}></div>
    </div>
  )
}
