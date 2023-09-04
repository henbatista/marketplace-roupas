import { useState } from 'react'
import { Resource } from '@prisma/client'
import type { NextPage } from 'next'
import ResourcesGrid from '../components/ResourcesGrid'
import { prisma } from '../lib/prisma'
import Layout from '../sections/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'

export async function getServerSideProps() {
  const resources = await prisma.resource.findMany()

  return {
    props: {
      resources: JSON.parse(JSON.stringify(resources))
    }
  }
}

type Props = {
  resources: Resource[]
}

const Home: NextPage<Props> = ({ resources = [] }) => {
  const [filter, setFilter] = useState<string>('') // Estado para rastrear o filtro

  // Função para atualizar o filtro quando o usuário digitar algo
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  // Filtrar os recursos com base no filtro
  const filteredResources = resources.filter(resource =>
    resource.sport.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <Layout>
      <main className="max-w-screen-2xl mx-auto flex justify-between items-start gap-20 px-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-7">Todos nossos produtos</h1>

          {/* Campo de entrada para o filtro */}
          <input
            type="text"
            placeholder="Filtrar por esporte"
            value={filter}
            onChange={handleFilterChange}
            className="mb-4 p-2 border rounded"
          />

          {/* Renderizar os recursos filtrados */}
          <ResourcesGrid resources={filteredResources} />
        </div>
      </main>
    </Layout>
  )
}

export default Home
