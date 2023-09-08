import axios from 'axios'
import type { NextPage } from 'next'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../../sections/Layout'
import { Form } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'

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

const CreateResource: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    image_url: '',
    type: '',
    price: 0,
    seller: '',
    available_sizes: '',
    details: '',
    sport: ''
  })

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.item(0)
    if (!file) {
      toast.error('Arquivo Obrigatório')
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

    toast.promise(axios.post('/api/resources/create', formData), {
      loading: 'Carregando...',
      success: () => {
        setFormData({
          name: '',
          image_url: '',
          type: '',
          price: 0,
          seller: '',
          available_sizes: '',
          details: '',
          sport: ''
        })

        return <span>Resource created!</span>
      },
      error: error => <span>{error.response.data.message}</span>
    })
  }

  return (
    <Layout>
      <Form
        onSubmit={handleAddResource}
        className="max-w-screen-lg mx-auto flex flex-col px-4"
      >
        <h1 className="text-2xl font-bold mb-2">Criar novo item</h1>
        <span className="text-xl text-gray-500 mb-14">
          Carregue o item que deseja compartilhar com o marketplace
        </span>
        <div className="w-full flex flex-col gap-2 mb-6">
          <Form.Group className="position-relative mb-3">
            <Form.Label>Imagem</Form.Label>
            <Form.Control
              type="file"
              required
              name="image_url"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback
              type="invalid"
              tooltip
            ></Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3"></Form.Group>
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
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
            <Form.Label>Valor do Produto</Form.Label>
            <Form.Control
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
            <Form.Label>Tipo do produto</Form.Label>
            <Form.Control
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

export default CreateResource
