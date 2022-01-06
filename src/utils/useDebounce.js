import React, { useEffect, useRef, useCallback } from 'react'

function useDebounce(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null })

  var timer = (0, useRef)()
  var fnRef = (0, useRef)(fn)
  // useEffect(
  //   function () {
  //     current.fn = fn
  //     console.log('effect')
  //   },
  //   [fn]
  // )
  // 使用useCallback存储普通debounce函数
  return useCallback(function debounce(...args) {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    console.log(fnRef.current, 'curent')
    timer.current = setTimeout(() => {
      fnRef.current.call(this, ...args)
    }, delay)
  }, dep)
}

export default useDebounce

// import React, { useEffect, useRef, useCallback } from 'react'

// function useDebounce(fn, delay, dep = []) {
//   const { current } = useRef({ fn, timer: null })

//   var timer = (0, useRef)()
//   var fnRef = (0, useRef)(fn)
//   useEffect(
//     function () {
//       current.fn = fn
//       console.log('effect')
//     },
//     [fn]
//   )
//   // 使用useCallback存储普通debounce函数
//   return useCallback(function debounce(...args) {
//     if (current.timer) {
//       clearTimeout(current.timer)
//     }
//     console.log(current, 'curent')
//     current.timer = setTimeout(() => {
//       current.fn.call(this, ...args)
//     }, delay)
//   }, dep)
// }

// export default useDebounce
