import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  // Authenticated routes
  app.post('/users', { onRequest: [verifyJwt] }, create)
}
