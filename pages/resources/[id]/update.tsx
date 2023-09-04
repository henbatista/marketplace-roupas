import { Resource } from '@prisma/client'
import axios from 'axios'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { prisma } from '../../../lib/prisma'
import Layout from '../../../sections/Layout'
import { Form } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'

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

type FormData = {
  name: string
  image_url: string | ArrayBuffer | null
  type: string
  price: number
  seller: string
  available_sizes: string
  details: string
  sport: string
}

const UpdateResource: NextPage<StaticProps> = ({ resource = null }) => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: resource?.name || '',
    image_url: resource?.image_url || '',
    type: resource?.type || '',
    price: resource?.price || 0,
    seller: resource?.seller || '',
    available_sizes: resource?.available_sizes || '',
    details: resource?.details || '',
    sport: resource?.sport || ''
  })

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.item(0)
    if (!file) {
      toast.error('Um arquivo é obrigatório')
      return
    }

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setFormData({ ...formData, image_url: reader.result })
    })
    reader.readAsDataURL(file)
  }

  async function handleAddResource(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    toast.promise(axios.put(`/api/resources/${resource?.id}`, formData), {
      loading: 'Carregando...',
      success: <span>Arquivo criado!</span>,
      error: error => <span>{error.response.data.message}</span>
    })
  }

  if (router.isFallback || !resource) {
    return <span>Loading...</span>
  }

  return (
    <Layout>
      <Form
        onSubmit={handleAddResource}
        className="max-w-screen-lg mx-auto flex flex-col px-4"
      >
        <h1 className="text-2xl font-bold mb-2">Update a resource</h1>
        <span className="text-xl text-gray-500 mb-14">
          Atualize o item que deseja compartilhar com o marketplace
        </span>

        <div className="w-full flex flex-col gap-2 mb-6">
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              id="name"
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="w-full flex flex-col gap-2 mb-5">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Discrição do Produto</Form.Label>
            <Form.Control
              as="textarea"
              id="details"
              name="details"
              rows={3}
              onChange={handleChange}
              value={formData.details}
              required
            />
          </Form.Group>
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              id="price"
              type="number"
              name="price"
              value={formData.price}
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              id="name"
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Tipo do produto</Form.Label>
            <Form.Control
              id="type"
              type="text"
              name="type"
              value={formData.type}
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Marca do produto</Form.Label>
            <Form.Control
              id="seller"
              type="text"
              name="seller"
              value={formData.seller}
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Tamanhos</Form.Label>
            <Form.Control
              id="available_sizes"
              type="text"
              name="available_sizes"
              value={formData.available_sizes}
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Tipo de Esporte</Form.Label>
            <Form.Control
              id="sport"
              type="texte"
              name="sport"
              value={formData.sport}
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </div>
        <button className="px-6 py-3 bg-sky-700 text-white rounded-lg ml-auto outline-none focus:outline-offset-0 focus:outline-sky-300 focus:outline-[3px] transition-all">
          Adicionar novo item
        </button>
      </Form>
    </Layout>
  )
}

export default UpdateResource
