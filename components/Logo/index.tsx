import React from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'

const Logo = () => {
  return (
    <div className="flex items-center gap-6">
      <Image
        alt=""
        src={logo}
        width="100"
        height="100"
        className="d-inline-block align-center"
      />
      <span className="text-xl font-bold">
        <span className="text-sky-700"> Marketplace </span>
      </span>
    </div>
  )
}

export default Logo
