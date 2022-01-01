import { Tag } from 'antd-mobile'
import Img from '../commmon/Img'
import utilStyles from '../../styles/utils.module.css'
/* eslint-disable react/prop-types */
import dayjs from 'dayjs'

export default function Info({ data }) {
  return (
    <div
      // align="center"
      // wrap
      style={{
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '208px',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* 名字和channel */}
      <div
        style={{
          display: 'flex',
          flex: '0 0 35px',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: '45 0 40px',
            flexDirection: 'row',
            fontFamily: 'SourceSansPro-Semibold',
            fontSize: '1.2rem'
          }}
        >
          <Img src={data.creator.avatar} width={20} height={20}></Img>
          <p style={{ paddingLeft: '3px' }}> {data.creator.username}</p>
        </div>
        <div
          style={{
            flex: '1'
          }}
        >
          <Tag round color="#8560A9" fill="outline">
            {data.channel.name}
          </Tag>
        </div>
      </div>
      {/* 名字和channel  end*/}

      {/* 左字右图 */}
      <div
        style={{
          display: 'flex',
          flex: '2 0 auto',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        {/* 4行字 */}
        <div
          style={{
            display: 'flex',
            flex: '5 0 200px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <div
            style={{
              flex: '1 1',
              fontSize: '1.5rem',
              fontFamily: 'SourceSansPro-Semibold'
            }}
            className="title"
          >
            {data.name}
          </div>
          <div
            style={{
              flex: '0.5 1',
              fontSize: '0.8rem',
              fontFamily: 'SourceSansPro-Regular',
              color: '#8560A9'
            }}
            className="time"
          >
            <svg
              style={{
                width: '1.2rem',
                height: '1.2rem'
              }}
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="#8560A9"
            >
              <title>search</title>
              <path
                d="M21.2,21.6l-1.9,1.9l0,0l-5.6-5.5V7.6h2.7v9.2L21.2,21.6z M30.2,16.3c0,7.8-6.3,14.2-14.2,14.2
	S1.8,24.2,1.8,16.3C1.8,8.5,8.2,2.2,16,2.1c0,0,0,0,0,0C23.8,2.2,30.2,8.5,30.2,16.3z M27.5,16.3C27.5,10,22.3,4.9,16,4.9
	C9.7,4.9,4.5,10,4.5,16.3c0,6.3,5.1,11.5,11.5,11.5C22.3,27.8,27.5,22.7,27.5,16.3z"
              />
            </svg>
            {dayjs(data.begin_time).format('DD MMM YYYY HH:mm')} -{' '}
            {dayjs(data.end_time).format('DD MMM YYYY HH:mm')}
          </div>

          <div
            className={utilStyles.omit}
            style={{
              flex: '5 0 20px',
              overflow: 'hidden',
              fontSize: '1.2rem',
              fontFamily: 'SourceSansPro-Regular',
              display: '-webkit-box',
              maxHeight: '5.7rem'
            }}
          >
            {data.description}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: '1 0 ',
              overflow: 'hidden',
              fontSize: '1rem',
              fontFamily: 'SourceSansPro-Regular',
              color: '#453257'
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation()
                console.log('going')
              }}
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <svg
                style={{
                  width: '1.2rem',
                  height: '1.2rem'
                }}
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="#8560A9"
              >
                <title>search</title>
                <path d="M31.34,10.06L12.68,29.22a1,1,0,0,1-1.43,0L0.66,19.14a1,1,0,0,1,0-1.4L5,13.55a1,1,0,0,1,1.43,0L11.22,18,24.88,3.77a1,1,0,0,1,1.44,0l5,4.89A1,1,0,0,1,31.34,10.06ZM25.63,5.89L12,20.14a1,1,0,0,1-1.43,0L5.68,15.64,2.81,18.44l9.14,8.66L29.21,9.38Z" />
              </svg>
              <div style={{ width: 5 }}></div>
              {data.me_going ? "I'm going!" : data.goings_count + ' Goings'}
            </div>

            <div style={{ width: 20 }}></div>
            <div
              onClick={(e) => {
                e.stopPropagation()
                console.log('liked')
              }}
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <svg
                style={{
                  width: '1.2rem',
                  height: '1.2rem'
                }}
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="#8560A9"
              >
                <path
                  id="Shape_2_"
                  d="M22,4c-2.3,0-4.5,1.1-6,2.8C14.5,5.1,12.3,4,10,4c-4.1,0-7.3,3.2-7.3,7.3c0,5,4.5,9.1,11.4,15.4l1.9,1.7
	l1.9-1.8c6.9-6.2,11.4-10.3,11.4-15.4C29.3,7.2,26.1,4,22,4L22,4z M16.1,24.7L16,24.9l-0.1-0.1C9.5,19,5.3,15.2,5.3,11.3
	c0-2.7,2-4.7,4.7-4.7c2.1,0,4.1,1.3,4.8,3.1h2.5C17.9,8,19.9,6.7,22,6.7c2.7,0,4.7,2,4.7,4.7C26.7,15.2,22.5,19,16.1,24.7L16.1,24.7
	z"
                />
              </svg>
              <div style={{ width: 5 }}></div>
              {data.me_going ? 'I like it!' : data.goings_count + ' Likes'}
            </div>
          </div>
        </div>
        {/* 4行字 */}

        {/* 一张图 */}
        {data.images.length ? (
          <div
            style={{
              flex: '1 30 50px'
            }}
          >
            <Img src={data.images[0]} width={100} height={100}></Img>
          </div>
        ) : (
          <></>
        )}
        {/* 一张图 */}
      </div>
      {/* 左字右图 */}
    </div>
  )
}
