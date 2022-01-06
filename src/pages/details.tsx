import { useEffect, useState } from 'react'
import { BASE_URL, _fetch } from '../utils/network.js'
import { history } from 'umi'
import MyTab from '@/components/commmon/Tab'
import Comments from '@/components/details/comments'

import Cookies from 'js-cookie'

import { Avatar, Box, CardContent, Divider } from '@mui/material'
import { Tag } from 'antd-mobile'

export default function Details() {
  let userInfo = JSON.parse(Cookies.get('USER_INFO'))
  const [event, setEvent] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function handleClick() {
      let id = history.location.query.id || 1
      let { event } = await _fetch(BASE_URL + '/events/' + id)
      let { comments } = await _fetch(BASE_URL + '/events/' + id + '/comments')
      setComments(comments)
      setEvent(event)
    }
    handleClick()
  }, [])
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      {event.channel ? (
        <>
          <MyTab userInfo={userInfo} type="details" />
          <Box>
            <CardContent>
              <Tag round color="#8560A9" fill="outline">
                {event.channel.name}
              </Tag>
              <div
                style={{
                  fontSize: '1.7rem',
                  fontFamily: 'SourceSansPro-Semibold'
                }}
                className="title"
              >
                {event.name}
              </div>
              <Box sx={{ padding: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    flex: '45 0 40px',
                    flexDirection: 'row',
                    color: '#67616D',
                    fontFamily: 'SourceSansPro-Regular',
                    fontSize: '1.2rem',
                    alignItems: 'center'
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={event.creator.avatar}
                    sx={{ width: 36, height: 36 }}
                  ></Avatar>

                  <div style={{ paddingLeft: '10px' }}>
                    {event.creator.username} <br />
                    <p style={{ fontSize: '0.8rem', color: '#BABABA,' }}>
                      {event.create_time}
                    </p>
                  </div>
                </div>
              </Box>
              <Divider></Divider>
              <Comments comments={comments} />
            </CardContent>
          </Box>
          <ul></ul>
        </>
      ) : (
        'loading'
      )}
    </div>
  )
}
