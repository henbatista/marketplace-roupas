import Head from 'next/head'
import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

type Props = {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Head>
        <title>Marktplace</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header />

      {children}

      <Footer />
    </div>
  )
}

export default Layout
