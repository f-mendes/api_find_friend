import { FastifyInstance } from 'fastify'
import { create } from './create'
import { uploadImages } from '@/http/middlewares/upload-images'

const upload = uploadImages()

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { preHandler: upload.array('petImage', 4) }, create)
}
