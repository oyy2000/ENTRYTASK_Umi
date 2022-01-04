import { useRef, useEffect, useCallback } from 'react'
import useDebounced from '../../utils/useDebounce.js'
import { useDebounceFn } from '@umijs/hooks'
export default function myInfiniteScroll({ loadMore, hasMore }) {
  let myRef = useRef<HTMLDivElement>()
  // 首次加载
  useEffect(() => {
    setTimeout(() => {
      var element = myRef.current
      var current = window.innerHeight
      var rect = element.getBoundingClientRect()
      var elementTop = rect.top
      if (current >= elementTop) {
        console.log('loadmore')
        loadMore()
      }
    }, 0)
  }, [])
  function onScroll() {
    var element = myRef.current
    var current = window.innerHeight
    // console.log(myRef)
    var rect = element.getBoundingClientRect()
    var elementTop = rect.top

    if (current >= elementTop) {
      console.log('object')
      loadMore()
    }
  }
  const useDebouncedOnScroll = useDebounced(onScroll, 0)
  const { run } = useDebounceFn(onScroll, 20)
  useEffect(function () {
    window.addEventListener('scroll', useDebouncedOnScroll)
    return function () {
      window.removeEventListener('scroll', useDebouncedOnScroll)
    }
  }, [])
  return (
    <>
      <div ref={myRef}></div>
    </>
  )
}
