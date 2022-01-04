import { useEffect, useState, useRef } from 'react'
import { BASE_URL, _fetch } from '../../utils/consts.js'
import { history } from 'umi'
import { List, InfiniteScroll } from 'antd-mobile'
import Info from './Info'
import MyInfiniteScroll from './myInfiniteScroll'
function linkToDetails(id) {
  history.push('/details?id=' + id)
}

const PlayGround = ({ data }) => {
  const [posts, setPosts] = useState<Array<any>>(data)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const getMorePost = async () => {
    const { events, hasMore } = await _fetch(BASE_URL + '/events', {
      offset: posts.length,
      limit: 10
    })
    setHasMore(hasMore)
    setPosts((post) => [...post, ...events])
  }
  // console.log(posts, hasMore)
  // console.log(data)
  let theList = useRef()
  // console.log(theList.current)
  return (
    <>
      {posts.length ? (
        <>
          <div ref={theList}>
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
          </div>
          {/* <MyInfiniteScroll loadMore={getMorePost} hasMore={hasMore} /> */}
        </>
      ) : (
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
          {/* <MyInfiniteScroll loadMore={getMorePost} hasMore={hasMore} /> */}
        </>
      )}
      {/* 无限滚动列表 */}

      {/* <InfiniteScroll loadMore={getMorePost} hasMore={hasMore} /> */}
      <MyInfiniteScroll loadMore={getMorePost} hasMore={hasMore} />
    </>
  )
}

export default PlayGround
