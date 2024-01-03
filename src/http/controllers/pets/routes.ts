import { FastifyInstance } from 'fastify'
import { create } from './create'
import { uploadImages } from '@/http/middlewares/upload-images'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

const upload = uploadImages()

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    { onRequest: [verifyJwt], preHandler: upload.array('petImage', 4) },
    create,
  )
}
