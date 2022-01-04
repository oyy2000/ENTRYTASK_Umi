import { BASE_URL, _fetch } from '../utils/consts.js'
import Divider from '@mui/material/Divider'
import { theme } from '../styles/palette.js'
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
  channels.forEach((channel) => {
    channelChecked[channel.name] = false
  })
  useEffect(() => {
    const getChannels = async () => {
      let { channels } = await _fetch(BASE_URL + '/channels')
      setChannels(channels)
    }
    getChannels()
  }, [])
  // 展开抽屉 是个闭包函数
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
  // const [beforeTimes, setBeforeTimes] = useState();
  // const [afterTimes, setAfterTimes] = useState();
  //管理被选中的Date和Channels状态
  const [chosenDate, setChosenDate] = useState('ANYTIME')
  const [chosenChannels, setChosenChannels] = useState(channelChecked)
  // 点击操作
  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenDate((event.target as HTMLInputElement).value)
  }

  const handleChangeChannels = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenChannels({
      ...chosenChannels,
      [event.target.name]: event.target.checked
    })
  }

  // 搜索按钮点击后
  const ClickSearch = async (data) => {
    let before = dayjs().add(9, 'year').endOf('day').valueOf()
    let after = dayjs().subtract(9, 'year').startOf('day').valueOf()
    if (chosenDate === 'ANYTIME') {
    } else if (chosenDate === 'TODAY') {
      before = dayjs().endOf('day')
      after = dayjs().startOf('day')
    }

    let channels = []
    Object.values(chosenChannels).map((v, index) => {
      if (v) {
        channels.push(index + 1)
      }
    })
    data = {
      ...data,
      ...{ channels, before, after }
    }
    Search(data)
    // 重置选项
    // setChosenChannels(channelChecked);
    // setChosenDate('ANYTIME');
  }
  const list = (anchor: Anchor) => (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270,
          bgcolor: '#453257',
          color: 'white',
          textAlign: 'center'
        }}
        role="presentation"
        onKeyDown={toggleDrawer(anchor, false)}
      >
        {/* 单选date */}
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
                onChange={handleChangeDate}
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
                  control={<Radio />}
                  label="TOMORROW"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </nav>
        <Divider />
        {/* 多选channels*/}
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
                          onChange={handleChangeChannels}
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
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          onClick={() => ClickSearch()}
        >
          <Button>search</Button>
        </Paper>
      </Box>
    </ThemeProvider>
  )
  return (
    <>
      <div>
        <div>
          {(['left'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Box>{list(anchor)}</Box>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
