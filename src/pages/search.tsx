import Content from '../components/playground';
import Tab from '../components/Tab';
import { BASE_URL, _fetch } from '../utils/consts.js';
import Cookies from 'js-cookie';
import Divider from '@mui/material/Divider';
import { theme } from '../styles/palette.js';
import dayjs from 'dayjs';
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
  FormGroup,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Search } from '@mui/icons-material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
export default function index(search) {
  const [channels, setChannels] = useState([]);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // getChannels
  let channelChecked = {};
  useEffect(() => {
    const getChannels = async () => {
      let { channels } = await _fetch(BASE_URL + '/channels');
      setChannels(channels);
      channels.forEach((channel) => {
        channelChecked[channel.name] = false;
      });
    };
    getChannels();
  }, []);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
  // const [beforeTimes, setBeforeTimes] = useState();
  // const [afterTimes, setAfterTimes] = useState();
  const [chosenDate, setChosenDate] = useState('ANYTIME');

  const [chosenChannels, setChosenChannels] = useState(channelChecked);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenDate((event.target as HTMLInputElement).value);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenChannels({
      ...chosenChannels,
      [event.target.name]: event.target.checked,
    });
  };

  const [posts, setPosts] = useState([]);
  const Search = async (options) => {
    // console.log(chosenChannels);
    let before = dayjs().add(9, 'year').endOf('day').valueOf();
    let after = dayjs().subtract(9, 'year').startOf('day').valueOf();
    if (chosenDate === 'ANYTIME') {
    } else if (chosenDate === 'TODAY') {
      before = dayjs().endOf('day');
      after = dayjs().startOf('day');
    }

    let channels = [];
    Object.values(chosenChannels).map((v, index) => {
      if (v) {
        channels.push(index + 1);
      }
    });
    options = {
      ...options,
      ...{ channels, before, after },
    };
    const { events, hasMore } = await _fetch(BASE_URL + '/events', options);
    setPosts((post) => [...post, ...events]);
    // setChosenChannels(channelChecked);
    // setChosenDate('ANYTIME');
  };
  console.log(posts);
  const list = (anchor: Anchor) => (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270,
          height: '800px',
          bgcolor: '#453257',
          color: 'white',
          textAlign: 'center',
        }}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
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
                  control={<Radio />}
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
                  );
                })}
              </FormGroup>
            </FormControl>
          </Box>
        </nav>
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          onClick={() => Search()}
        >
          <Button>search</Button>
        </Paper>
      </Box>
    </ThemeProvider>
  );
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
  );
}
