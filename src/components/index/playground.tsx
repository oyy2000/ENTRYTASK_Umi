import { useEffect, useState } from 'react'
import { BASE_URL, _fetch } from '../../utils/network.js'
import { history } from 'umi'
import { List, InfiniteScroll } from 'antd-mobile'
import Info from './Info'
import MyInfiniteScroll from './myInfiniteScroll'
function linkToDetails(id) {
  history.push('/details?id=' + id)
  sessionStorage.setItem('scrollId', id)
}

const PlayGround = ({ data }) => {
  // useEffect(() => {
  //   // setTimeout(() => {
  //   if (history.action === 'PUSH') {
  //     sessionStorage.removeItem('scrollId')
  //     return
  //   }
  //   // let id = sessionStorage.getItem('scrollId')
  //   // console.log(id)
  //   // if (id) document.getElementById('scroll').scrollIntoView()
  //   // window.scroll(1110, -10000)
  //   // document.body.scroll(1000, 10000)
  //   // console.log('scroll')
  //   // console.log(window)
  //   // document.body.scrollTo(0, document.documentElement.clientHeight)
  //   // window.scrollX = 10000
  //   // window.scrollY = 10000

  //   // console.log(document.getElementById('scroll'))
  //   // })
  // }, [])
  // // document.body.scrollTo(0, document.documentElement.clientHeight)
  // // console.log(document.documentElement.clientHeight)
  const [posts, setPosts] = useState<Array<any>>(data)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const getMorePost = async () => {
    const { events, hasMore } = await _fetch(BASE_URL + '/events', {
      offset: posts.length,
      limit: 10
    })
    setHasMore(hasMore)
    setPosts((data) => [...data, ...events])
  }
  return (
    <>
      <List style={{ width: '100%' }}>
        {posts.map((data) => (
          <List.Item
            key={data.id}
            onClick={() => {
              linkToDetails(data.id)
            }}
            arrow={false}
          >
            <Info data={data}></Info>
          </List.Item>
        ))}
      </List>

      {/* 无限滚动列表 */}
      {/* <InfiniteScroll loadMore={getMorePost} hasMore={hasMore} /> */}
      {data.length ? (
        <MyInfiniteScroll loadMore={getMorePost} hasMore={hasMore} />
      ) : (
        <></>
      )}
      <div id="scroll"></div>
    </>
  )
}

export default PlayGround

// import { useEffect, useState, useRef } from 'react'
// import { BASE_URL, _fetch } from '../../utils/network.js'
// import { history } from 'umi'
// import { List, InfiniteScroll } from 'antd-mobile'
// import Info from './Info'
// import MyInfiniteScroll from './myInfiniteScroll'
// function linkToDetails(id) {
//   history.push('/details?id=' + id)
// }

// const PlayGround = ({ data }) => {
//   const [posts, setPosts] = useState<Array<any>>(data)
//   const [hasMore, setHasMore] = useState<boolean>(true)
//   const getMorePost = async () => {
//     const { events, hasMore } = await _fetch(BASE_URL + '/events', {
//       offset: posts.length,
//       limit: 10
//     })
//     setHasMore(hasMore)
//     setPosts((post) => [...post, ...events])
//   }
//   return (
//     <>
//       {posts.length ? (
//         <>
//             <List style={{ width: '100%' }}>
//               {posts.map((data) => (
//                 <List.Item
//                   key={data.id}
//                   onClick={() => {
//                     linkToDetails(data.id)
//                   }}
//                   arrow={false}
//                 >
//                   <Info data={data}></Info>
//                 </List.Item>
//               ))}
//             </List>
//           </div>
//           {/* <MyInfiniteScroll loadMore={getMorePost} hasMore={hasMore} /> */}
//         </>
//       ) : (
//         <>
//           <List style={{ width: '100%' }}>
//             {posts.map((data) => (
//               <List.Item
//                 key={data.id}
//                 onClick={() => {
//                   linkToDetails(data.id)
//                 }}
//                 arrow={false}
//               >
//                 <Info data={data}></Info>
//               </List.Item>
//             ))}
//           </List>
//           {/* <MyInfiniteScroll loadMore={getMorePost} hasMore={hasMore} /> */}
//         </>
//       )}
//       {/* 无限滚动列表 */}

//       {/* <InfiniteScroll loadMore={getMorePost} hasMore={hasMore} /> */}
//       <MyInfiniteScroll loadMore={getMorePost} hasMore={hasMore} />
//     </>
//   )
// }

// export default PlayGround
