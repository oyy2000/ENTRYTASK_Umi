import {
  Button,
  Typography,
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Avatar,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { HomeIcon, LogoIcon, SearchIcon } from './SVGs/Icons.js';
import { theme } from '../styles/palette.js';

export default function ButtonAppBar({ type, userInfo, toggleDrawer }) {
  function handerClick(e) {
    toggleDrawer(e); // 执行父组件的changeColor 并传参 必须和父组件中的函数一模一样
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" color="neutral">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ float: 'left' }}
              onClick={(e) => {
                handerClick(e);
              }}
            >
              {type == 'details' ? (
                <HomeIcon sx={{ color: '#453257', fontSize: '24px' }} />
              ) : (
                <SearchIcon sx={{ color: '#453257', fontSize: '24px' }} />
              )}
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, justifyContent: 'center', display: 'flex' }}
            >
              <LogoIcon sx={{ color: '#D5EF7F', fontSize: '26px' }} />
            </Typography>
            <Typography variant="h6" component="div" sx={{ float: 'right' }}>
              <Avatar
                alt="Remy Sharp"
                src={userInfo.avatar}
                sx={{ width: 26, height: 26 }}
              />
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
