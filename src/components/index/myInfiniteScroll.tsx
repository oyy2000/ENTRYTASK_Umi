import { useDebounceFn } from '@umijs/hooks'
import { useRef, useEffect } from 'react'
import useDebounced from '../../utils/useDebounce.js'
// import { useDebounceFn } from '@umijs/hooks'
export default function myInfiniteScroll({ loadMore, hasMore }) {
  let myRef = useRef<HTMLDivElement>()
  // 首次加载
  useEffect(() => {
    console.log('first')
    onScroll()
  }, [])

  function onScroll() {
    // setTimeout(() => {
    var element = myRef.current
    console.log(myRef)
    var current = window.innerHeight
    var rect = element?.getBoundingClientRect()
    var elementTop = rect?.top

    if (current >= elementTop && hasMore) {
      loadMore()
    }
    // }, 2000)
  }
  const useDebouncedOnScroll = useDebounced(onScroll, 500)
  // 尝试使用umi / hooks中的useDebounceFn
  // const { run } = useDebounceFn(onScroll, 100)
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
