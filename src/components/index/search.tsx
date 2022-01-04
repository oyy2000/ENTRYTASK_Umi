import { BASE_URL, _fetch } from '../../utils/consts.js'
import Divider from '@mui/material/Divider'
import { theme } from '../../styles/palette.js'
import { HomeIcon, LogoIcon, SearchIcon } from '../SVGs/Icons.js'

import dayjs from 'dayjs'
import {
  Box,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  ThemeProvider,
  Button,
  Paper,
  Checkbox,
  FormGroup
} from '@mui/material'

import React, { useState, useEffect } from 'react'

type Anchor = 'top' | 'left' | 'bottom' | 'right'
export default function index({ Search }) {
  const [channels, setChannels] = useState([])
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })
  // getChannels
  let channelChecked = {}
  useEffect(() => {
    const getChannels = async () => {
      let { channels } = await _fetch(BASE_URL + '/channels')
      setChannels(channels)
      channels.forEach((channel) => {
        channelChecked[channel.name] = false
      })
    }
    getChannels()
  }, [])

  const [chosenDate, setChosenDate] = useState('ANYTIME')

  const [chosenChannels, setChosenChannels] = useState(channelChecked)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenDate((event.target as HTMLInputElement).value)
  }

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenChannels({
      ...chosenChannels,
      [event.target.name]: event.target.checked
    })
  }

  const [posts, setPosts] = useState([])
  const ClickSearch = async (options) => {
    let before = dayjs().add(9, 'year').endOf('day').valueOf()
    let after = dayjs().subtract(9, 'year').startOf('day').valueOf()
    if (chosenDate === 'ANYTIME') {
    } else if (chosenDate === 'TODAY') {
      before = dayjs().endOf('day').valueOf()
      after = dayjs().startOf('day').valueOf()
    }
    let channels = []
    Object.values(chosenChannels).map((v, index) => {
      if (v) {
        channels.push(index + 1)
      }
    })
    options = {
      ...options,
      ...{ channels, before, after }
    }
    Search(options)
    //重置
    setChosenChannels(channelChecked)
    setChosenDate('ANYTIME')
    // 关闭自己
  }
  const list = (anchor: Anchor) => (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270,
          height: '100vh',
          bgcolor: '#453257',
          color: 'white',
          textAlign: 'center'
        }}
        role="presentation"
      >
        <nav aria-label="date">
          <Box sx={{ padding: '20px' }}>
            <FormControl component="fieldset">
              <FormLabel
                color="bright"
                sx={{ color: '#AC8EC9', fontSize: '1.2rem' }}
              >
                DATE
              </FormLabel>
              <Divider sx={{ bgcolor: '#8560A9' }} />
              <RadioGroup
                row
                aria-label="date"
                name="controlled-radio-buttons-group"
                value={chosenDate}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="ANYTIME"
                  control={<Radio color="bright" />}
                  label="ANYTIME"
                />
                <FormControlLabel
                  value="TODAY"
                  control={<Radio color="bright" />}
                  label="TODAY"
                />
                <FormControlLabel
                  value="TOMORROW"
                  control={<Radio color="bright" />}
                  label="TOMORROW"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <Box sx={{ padding: '20px' }}>
            <FormControl component="fieldset">
              <FormLabel
                color="bright"
                sx={{ color: '#AC8EC9', fontSize: '1.2rem' }}
              >
                CHANNEL
              </FormLabel>
              <Divider sx={{ bgcolor: '#8560A9' }} />

              <FormGroup aria-label="position" row>
                {channels.map((channel) => {
                  return (
                    <FormControlLabel
                      label={channel.name.toUpperCase()}
                      control={
                        <Checkbox
                          checked={chosenChannels[channel.name]}
                          onChange={handleChange2}
                          name={channel.name}
                          color="bright"
                          key={channel.id}
                        />
                      }
                    />
                  )
                })}
              </FormGroup>
            </FormControl>
          </Box>
        </nav>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '270px'
          }}
          onClick={() => ClickSearch()}
        >
          <Button
            variant="contained"
            fullWidth
            color="bright"
            startIcon={<SearchIcon></SearchIcon>}
            sx={{ height: '60px' }}
          >
            SEARCH
          </Button>
        </Paper>
      </Box>
    </ThemeProvider>
  )
  return (
    <>
      <Box>{list('left')}</Box>
    </>
  )
}
