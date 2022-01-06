import PlayGround from '../components/index/playground'
import Tab from '../components/commmon/Tab'
import { BASE_URL, _fetch } from '../utils/network.js'
import Cookies from 'js-cookie'
import { Drawer } from '@mui/material'
import Search from '../components/index/search'
import React, { useState, useEffect } from 'react'
import SearchInfo from '../components/index/searchInfo'
const SEARCH_STATE = {
  NOT_YET: 1,
  SEARCHED_WITH_ANSWER: 2,
  SEARCHED_WITHOUT_ANSWER: 3
}
type Anchor = 'top' | 'left' | 'bottom' | 'right'
export default function index() {
  // 获取用户信息
  let userInfo = JSON.parse(Cookies.get('USER_INFO'))
  // 抽屉的方向
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })
  // 搜索的
  const [searchState, setSearchState] = useState<number>(SEARCH_STATE.NOT_YET)
  useEffect(() => {
    getPost()
  }, [])
  const [posts, setPosts] = useState<Array<any>>([])
  const [dateAndChannels, setDateAndChannels] = useState({})
  const [isError, setIsError] = useState({})

  const getPost = async () => {
    const { events, error } = await _fetch(BASE_URL + '/events', {
      offset: posts.length,
      limit: 10
    })
    setIsError(error)
    if (error) return
    setPosts(events)
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setState({ ...state, [anchor]: open })
    }

  async function SearchEvents(data) {
    setDateAndChannels(data)
    const { events } = await _fetch(BASE_URL + '/events', data)
    //返回的事件结果存储起来
    setPosts(events)
    //关闭drawer
    setState({ ...state, ['left']: false })
    if (events.length > 0) setSearchState(SEARCH_STATE.SEARCHED_WITH_ANSWER)
    else setSearchState(SEARCH_STATE.SEARCHED_WITHOUT_ANSWER)
  }
  async function CleanSearch() {
    setSearchState(SEARCH_STATE.NOT_YET)
    const { events } = await _fetch(BASE_URL + '/events')
    setPosts(events)
  }

  if (isError?.status) {
    return <a href="http://localhost:3000/login">Please Login</a>
  } else
    return (
      <>
        {/* 菜单栏 */}
        <Tab
          userInfo={userInfo}
          type="index"
          toggleDrawer={toggleDrawer('left', true)}
        />
        {/* 根据搜索情况来展示 */}
        {searchState == SEARCH_STATE.NOT_YET ? (
          <></>
        ) : searchState == SEARCH_STATE.SEARCHED_WITH_ANSWER ? (
          <SearchInfo
            CleanSearch={CleanSearch}
            data={dateAndChannels}
            length={posts.length}
          />
        ) : (
          <div>
            <SearchInfo
              CleanSearch={CleanSearch}
              data={dateAndChannels}
              length={posts.length}
            />
          </div>
        )}
        {/* 无限滚动内容 */}
        <PlayGround data={posts} />

        {/* 抽屉 */}
        <div>
          {(['left'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                sx={{ height: '100vh' }}
              >
                <Search Search={SearchEvents}></Search>
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </>
    )
}
