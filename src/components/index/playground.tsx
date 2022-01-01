import { useEffect, useState } from 'react'
import { BASE_URL, _fetch } from '../../utils/consts.js'
import { history } from 'umi'
import { List } from 'antd-mobile'
import Info from './Info'

function linkToDetails(id) {
  console.log(id)
  history.push('/details?id=' + id)
}
const PlayGround = () => {
  useEffect(() => {
    getMorePost()
  }, [])
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const getMorePost = async () => {
    const { events, hasMore } = await _fetch(BASE_URL + '/events', {
      limit: 10,
      offset: posts.length
    })
    setHasMore(hasMore)
    setPosts((post) => [...post, ...events])
  }
  return (
    <>
      {/* 防止被Tab遮住 */}
      <div style={{ height: '56px' }} />
      {/* 无限滚动列表 */}
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
    </>
  )
}

export default PlayGround
