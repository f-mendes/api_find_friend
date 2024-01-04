import { FastifyInstance } from 'fastify'
import { create } from './create'
import { uploadImages } from '@/http/middlewares/upload-images'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { getById } from './getById'

const upload = uploadImages()

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', getById)

  // Authenticated routes
  app.post(
    '/pets',
    { onRequest: [verifyJwt], preHandler: upload.array('petImage', 4) },
    create,
  )
}
