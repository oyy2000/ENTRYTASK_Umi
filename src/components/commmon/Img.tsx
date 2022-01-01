/* eslint-disable react/prop-types */
export default function Img({ src, width, height }) {
  return (
    <img
      style={{
        width,
        height,
        borderRadius: '99%'
      }}
      src={src}
    ></img>
  )
}
// export default function ImgWrapper({ Component }) {
//   return (
//     <div
//       style={{
//         borderRadius: "99%",
//       }}
//     >
//       <Component />
//     </div>
//   )
// }
