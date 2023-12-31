import { Resource } from '@prisma/client'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { prisma } from '../../../lib/prisma'
import Layout from '../../../sections/Layout'

type StaticProps = {
  resource: Resource
}

type StaticParams = {
  id: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const resources = await prisma.resource.findMany({
    select: { id: true }
  })

  return {
    paths: resources.map(resource => ({ params: { id: resource.id } })),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<
  StaticProps,
  StaticParams
> = async ({ params }) => {
  const resource = await prisma.resource.findUnique({
    where: { id: params?.id }
  })

  return {
    props: {
      resource: JSON.parse(JSON.stringify(resource))
    }
  }
}

const ViewResource: NextPage<StaticProps> = ({ resource = null }) => {
  const router = useRouter()

  if (router.isFallback || !resource) {
    return <span>Loading...</span>
  }

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto flex flex-col px-4">
        <h1 className="text-2xl font-bold mb-2">{resource.name}</h1>
        <span className="text-xl mb-8">{resource.details}</span>
        <div className="relative w-full h-[30rem] mb-4">
          <Image
            src={resource.image_url}
            alt={resource.name}
            width="500px"
            height="500px"
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <Link href={`/resources/${resource.id}/update`} passHref>
            <a className="px-6 py-3 text-sky-700 border-sky-700 border-[1px] rounded-lg outline-none focus:outline-offset-0 focus:outline-sky-300 focus:outline-[3px] transition-all">
              Update
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default ViewResource
