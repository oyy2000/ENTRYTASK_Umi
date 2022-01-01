import PlayGround from '../components/index/playground'
import Tab from '../components/commmon/Tab'
import { BASE_URL, _fetch } from '../utils/consts.js'
import Cookies from 'js-cookie'
import Divider from '@mui/material/Divider'
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import { useState } from 'react'
import React from 'react'
type Anchor = 'top' | 'left' | 'bottom' | 'right'
export default function index() {
  let userInfo = JSON.parse(Cookies.get('USER_INFO'))
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log(anchor)
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        height: '100%',
        bgcolor: '#453257'
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  )
  return (
    <>
      <div>
        <Tab
          userInfo={userInfo}
          type="index"
          toggleDrawer={toggleDrawer('left', true)}
        />
        <PlayGround userInfo={userInfo} />
        <div>
          {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
