import Image from 'next/image'

import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

type Props = {
  id: string
  name: string
  image_url: string
  type: string
  price: number
  seller: string
  available_sizes: string
  details: string
  sport: string
}

const Resource = ({
  id,
  name,
  image_url,
  type,
  price,
  seller,
  available_sizes,
  details,
  sport
}: Props) => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="card-img-top justify-items-center items-center">
          <Image
            src={image_url}
            alt={name}
            className=" justify-items-center items-center"
            width="250px"
            height="250px"
          />
        </div>
        <span className="text-xl font-bold">{name}</span>
        <p className="text-base">{price}</p>
      </div>

      <Button variant="primary" onClick={openModal}>
        Ver Detalhes
      </Button>

      {/* Modal de Detalhes */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-img-top justify-center items-center">
            <Image
              className="card-img-top justify-center items-center"
              src={image_url}
              alt={name}
              width="300px"
              height="300px"
            />
          </div>
          <p>
            <strong>Nome:</strong> {name}
          </p>
          <p>
            <strong>Tipo:</strong> {type}
          </p>
          <p>
            <strong>Preço:</strong> {price}
          </p>
          <p>
            <strong>Vendedor:</strong> {seller}
          </p>
          {available_sizes.length > 0 && (
            <p>
              <strong>Tamanhos Disponíveis:</strong> {available_sizes}
            </p>
          )}
          <p>
            <strong>Detalhes:</strong> {details}
          </p>
          <p>
            <strong>Esporte:</strong> {sport}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Resource
