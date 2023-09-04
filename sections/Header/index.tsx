import Link from 'next/link'
import React from 'react'
import Logo from '../../components/Logo'
import Image from 'next/image'

const Header = () => {
  return (
    <div>
      <section className="h-auto bg-white overflow-hidden">
        <div className="w-full bg-black relative z-20 font-medium text-sm h-10 text-left flex items-center text-white">
          <div className="max-w-2xl mx-auto text-left">
            <span className="md:-ml-10">
              <span className="md:inline mr-1 hidden">
                As melhores ofertas para você!
              </span>
            </span>
          </div>
        </div>
        <div className="max-w-6xl  xl:px-0 px-10 w-full relative z-20 flex mx-auto justify-between h-20 items-center">
          <div className="relative flex items-center pr-10">
            <Link href="/" passHref>
              <a className="flex items-center text-lg font-black">
                <Logo />
              </a>
            </Link>
          </div>
          <div className="absolute sm:relative w-full px-10 left-0 sm:mt-0 mt-32">
            <form className="relative w-full max-w-3xl mx-auto">
              <input
                type="text"
                className="h-auto px-5 py-2 cursor-pointer hover:bg-gray-200 text-sm w-full bg-gray-100 rounded-full"
                placeholder="Search for Anything"
              />
            </form>
          </div>
          <div className="relative flex space-x-5 font-medium">
            <Link href="/resources/create" passHref>
              <button
                className="inline-block w-24 h-16 px-10 py-0 m-0 overflow-visible text-xl font-semibold text-center text-white normal-case align-middle bg-green-400 border border-transparent border-solid rounded-full cursor-pointer select-none md:w-auto focus:outline-none focus:shadow-xs"
                data-rounded="rounded-full"
                data-primary="green-500"
              >
                Cadastrar Produto
              </button>
            </Link>
          </div>
        </div>
        <div className="container pt-16 mx-auto text-left md:text-center">
          <div className="relative max-w-4xl mx-auto">
            <h1 className="pb-2 text-4xl font-extrabold text-left text-transparent sm:text-5xl sm:text-6xl md:text-7xl md:text-center bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-green-400">
              Marketplace de Roupas e Acessórios
            </h1>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Header
