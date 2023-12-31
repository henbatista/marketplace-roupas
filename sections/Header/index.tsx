import Link from 'next/link'
import React from 'react'
import Logo from '../../components/Logo'
import Image from 'next/image'

const Header = () => {
  return (
    <div>
      <section className="h-auto bg-[#f9f8f5] overflow-hidden">
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
        <section className="h-auto bg-[#f9f8f5] py-16 sm:py-20 px-10">
          <div className="md:text-center max-w-7xl mx-auto">
            <h1 className="font-thin text-6xl lg:text-7xl xl:text-8xl mt-10">
              Explore um Mundo de Possibilidades no Nosso Marketplace!
            </h1>
            <div className="w-full md:block hidden max-w-7xl h-px bg-gradient-to-r my-5 from-white via-gray-300 to-white mx-auto"></div>
            <div className="w-full md:hidden block max-w-7xl h-px bg-gradient-to-r my-5 from-gray-300 to-white mx-auto"></div>
            <p className="font-light text-gray-500 text-base md:max-w-md mx-auto lg:max-w-none xl:text-xl">
              O seu destino número um para todas as suas necessidades de compras
              online. Aqui, reunimos uma vasta seleção de produtos de alta
              qualidade, das melhores marcas e vendedores confiáveis, para
              tornar a sua experiência de compra simples, conveniente e
              empolgante.
            </p>
          </div>
        </section>
      </section>
    </div>
  )
}

export default Header
