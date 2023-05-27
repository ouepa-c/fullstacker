import React, { type ReactNode } from 'react'

export interface ArrowDownProps {
  children?: ReactNode
}

const ArrowDown: React.FC<ArrowDownProps> = (props) => {

  return (
    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="4145" width="20" height="20">
      <path
        d="M823.104 567.616a32.672 32.672 0 1 0-46.176-46.176l-264.384 264.352-264.448-264.352a32.672 32.672 0 1 0-46.208 46.176l287.488 287.488a34.464 34.464 0 0 0 46.24 0z m0-352.512a32.672 32.672 0 0 0-46.176-46.176l-264.416 264.352-264.416-264.352a32.672 32.672 0 0 0-46.208 46.176l287.488 287.488a34.464 34.464 0 0 0 46.24 0z"
        fill="#3399FF" p-id="4146"></path>
    </svg>
  )
}

export default ArrowDown
