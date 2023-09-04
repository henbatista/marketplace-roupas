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
  throw new Error('O Supabase não está configurado corretamente')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res
      .status(405)
      .json({ message: `Método HTTP  ${req.method} não é válido` })
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
        message: `Todas as propriedades são obrigatórias`
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

    const SUPABASE_BUCKET = process.env.SUPABASE_PUBLIC_BUCKET
    if (!SUPABASE_BUCKET) {
      throw new Error('O Supabase não está configurado corretamente')
    }

    const contentTypeMatches = image_url.match(/data:(.*);base64/)
    const imageStringWithoutBase64 = image_url.split('base64,')

    if (!contentTypeMatches || !imageStringWithoutBase64) {
      return res.status(422).json({
        message: 'Seu Arquivo é invalido'
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

    await prisma.resource.create({
      data: {
        name,
        details,
        type,
        price,
        image_url: publicURL,
        seller,
        available_sizes,
        sport
      }
    })

    res.status(201).send({
      message: 'Item criado com sucesso'
    })
  } catch (error) {
    res.status(500).send({
      message: 'Algo de errado correu'
    })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
}
