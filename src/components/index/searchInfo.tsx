import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Card, CardContent, Button, Box } from '@mui/material'
import { CardMedia } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../styles/palette.js'
import dayjs from 'dayjs'
import { BallIcon } from '../SVGs/Icons.js'
export default function SearchInfo({ CleanSearch, length, data }) {
  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <ThemeProvider theme={theme}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#8560A9',
                  fontFamily: 'SourceSansPro-Semibold',
                  fontSize: '1.4rem'
                }}
                gutterBottom
              >
                {/* 展示搜索到的条数 */}
                {length + ' Result'}
                {/* 清除搜索 */}
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '40px',
                    bgcolor: '#D5EF7F',
                    fontSize: '0.7rem',
                    transform: 'scale(0.8)',
                    padding: '6px'
                  }}
                  color="bright"
                  onClick={CleanSearch}
                >
                  CLEAR SEARCH
                </Button>
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {'Searched for Channel ' +
                  data.channels +
                  ' from ' +
                  dayjs(data.after).format('DD/MM') +
                  ' to ' +
                  dayjs(data.before).format('DD/MM')}
              </Typography>
            </CardContent>
          </Card>
        </ThemeProvider>
      </Box>
      {length == 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            flexDirection: 'column'
          }}
        >
          <BallIcon sx={{ color: '#D3C1E5', fontSize: '100px' }} />
          <p style={{ color: '#BABABA', fontSize: '1.2rem' }}>
            No activity found
          </p>
        </Box>
      ) : (
        <></>
      )}
    </>
  )
}
