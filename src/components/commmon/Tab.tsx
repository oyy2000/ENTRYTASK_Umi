import {
  Typography,
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Avatar
} from '@mui/material'
import { history } from 'umi'
import { HomeIcon, LogoIcon, SearchIcon } from '../SVGs/Icons.js'

import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../styles/palette.js'

export default function ButtonAppBar({ type, userInfo, toggleDrawer }) {
  function handerClick(e) {
    toggleDrawer(e) // 执行父组件的toggleDrawer 并传参
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={theme}>
          {/* Tab栏 */}
          <AppBar position="fixed" color="neutral">
            <Toolbar>
              {/* 图标按钮  主页下为搜索 ， 细节页下为back */}
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ float: 'left' }}
              >
                {type == 'details' ? (
                  <HomeIcon
                    sx={{ color: '#453257', fontSize: '24px' }}
                    onClick={() => {
                      history.goBack()
                    }}
                  />
                ) : (
                  <SearchIcon
                    sx={{ color: '#453257', fontSize: '24px' }}
                    onClick={(e) => {
                      handerClick(e)
                    }}
                  />
                )}
              </IconButton>
              {/* LOGO */}
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, justifyContent: 'center', display: 'flex' }}
              >
                <LogoIcon sx={{ color: '#D5EF7F', fontSize: '26px' }} />
              </Typography>
              {/* 用户头像 跳转主页 */}
              <Typography variant="h6" component="div" sx={{ float: 'right' }}>
                <Avatar
                  alt="Remy Sharp"
                  src={userInfo.avatar}
                  sx={{ width: 26, height: 26 }}
                  onClick={() => {
                    history.push('/me')
                  }}
                />
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
      <div style={{ height: 56 }}></div>
    </>
  )
}
