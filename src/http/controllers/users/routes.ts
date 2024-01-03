import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/session', authenticate)
  app.patch('/token/refresh', refresh)
}
