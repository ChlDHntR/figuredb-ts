import React, { Fragment, useLayoutEffect, useRef, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import CommentSect from './CommentSect.tsx'
import { UserAuthContext } from '../context/UserAuthProvider'
import UserList from './UserList.tsx'
import PageIdProvider from '../context/PageIdProvider.tsx'

export default function FigurePage({ data }: any) {
  const id = useParams().id
  const testData = data.find((element: any) => element.id == id)
  const body = useRef(null)
  const side = useRef(null)
  const { currUser } = useContext(UserAuthContext)
  //console.log(currUser)
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
              <img src={testData.image} alt={`${testData.name} image`} />
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
        <PageIdProvider value={id}>
          <CommentSect />
        </PageIdProvider>
      </div>
      <PageIdProvider value={id}>
        <div className='side' ref={side}>
          <UserList data={data} currUser={currUser}></UserList>
        </div>
      </PageIdProvider>
    </div>
  )
}
