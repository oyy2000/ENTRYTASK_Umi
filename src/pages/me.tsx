import { Card, CardContent, Button, Box, Avatar } from '@mui/material'
import { EmailIcon } from '../components/commmon/svgIcons.js'
import Tab from '../components/commmon/Tab'
import Cookies from 'js-cookie'

export default function Me() {
  let userInfo = JSON.parse(Cookies.get('USER_INFO'))
  return (
    <>
      <Tab userInfo={userInfo} type="details" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '30vh',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={userInfo.avatar}
          sx={{ width: 72, height: 72, border: '4px solid #D3C1E5' }}
        ></Avatar>
        <span style={{ color: '#67616D', fontSize: '2rem' }}>
          {userInfo.username}
        </span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            color: '#8560A9',
            fontSize: '1.2rem'
          }}
        >
          <EmailIcon></EmailIcon>
          {userInfo.email}
        </div>
      </Box>
    </>
  )
}
