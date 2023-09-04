// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Resource } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import { decode } from 'base64-arraybuffer'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

type ResourceBody = Pick<
  Resource,
  | 'name'
  | 'details'
  | 'price'
  | 'type'
  | 'image_url'
  | 'seller'
  | 'available_sizes'
  | 'sport'
> & {
  image: string
}

type ResponseBody = {
  message: string
}

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_PUBLIC_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Há algo de errado com a configuração do supabase')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT'])
    return res
      .status(405)
      .json({ message: `Metodo ${req.method} não permitido` })
  }

  try {
    const data = req.body

    if (
      !data.name ||
      !data.details ||
      !data.image_url ||
      !data.type ||
      !data.price ||
      !data.seller ||
      !data.available_sizes ||
      !data.sport
    ) {
      return res.status(422).json({
        message: `As propriedades 'name', 'details', 'image_url', 'type', 'price', 'seller', 'available_sizes' e 'sport' são obrigatórias`
      })
    }

    if (!req.query.id) {
      return res.status(404).json({
        message: 'Não encontrado'
      })
    }

    const id = req.query.id as string
    const existingResource = await prisma.resource.findUnique({
      where: { id }
    })
    if (!existingResource) {
      return res.status(404).json({
        message: 'Recurso não encontrado'
      })
    }

    const {
      name,
      details,
      price,
      type,
      image_url,
      seller,
      available_sizes,
      sport
    } = data as ResourceBody

    if (image_url) {
      const SUPABASE_BUCKET = process.env.SUPABASE_PUBLIC_BUCKET
      if (!SUPABASE_BUCKET) {
        throw new Error('Há algo de errado com a configuração do supabase')
      }

      const contentTypeMatches = image_url.match(/data:(.*);base64/)
      const imageStringWithoutBase64 = image_url.split('base64,')

      if (!contentTypeMatches || !imageStringWithoutBase64) {
        return res.status(422).json({
          message: 'Seu arquivo é invalido'
        })
      }

      const contentType = contentTypeMatches[1]
      const [fileType, fileExtension] = contentType.split('/')
      if (fileType !== 'image') {
        return res.status(422).json({
          message: 'Apenas imagens são aceitas'
        })
      }

      const base64FileData = imageStringWithoutBase64[1]
      const filename = nanoid()
      const filepath = `${filename}.${fileExtension}`

      const { data: storageData, error: storageError } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(filepath, decode(base64FileData), {
          contentType,
          upsert: true
        })

      if (storageError || !storageData) {
        return res.status(500).json({
          message: 'Algo de errado ocorreu com o upload da imagem'
        })
      }

      const { publicURL } = supabase.storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(filepath)

      if (!publicURL) {
        return res.status(500).json({
          message: 'Algo de errado ocorreu com o upload da imagem'
        })
      }

      await prisma.resource.update({
        where: { id },
        data: {
          name,
          details,
          price,
          type,
          image_url,
          seller,
          available_sizes,
          sport: publicURL
        }
      })
    } else {
      await prisma.resource.update({
        where: { id },
        data: {
          name,
          details,
          price,
          type,
          image_url,
          seller,
          available_sizes,
          sport
        }
      })
    }

    res.status(200).send({
      message: 'Criado com sucesso  '
    })
  } catch (error) {
    res.status(500).send({
      message: 'Ocorreu um erro ao criar o recurso'
    })
  }
}
