import { Resource } from '@prisma/client'
import type { NextPage } from 'next'
import ResourcesGrid from '../components/ResourcesGrid'
import { prisma } from '../lib/prisma'
import Layout from '../sections/Layout'
import Nav from 'react-bootstrap/Nav'
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
  return (
    <Layout>
      <main className="max-w-screen-2xl mx-auto flex justify-between items-start gap-20 px-4">
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home">Active</Nav.Link>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav>

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-7">Todos nossos produtos</h1>

          <ResourcesGrid resources={resources} />
        </div>
      </main>
    </Layout>
  )
}

export default Home
