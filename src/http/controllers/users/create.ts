import { makeCreateUser } from '@/use-cases/factories/make-create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, email, password } = schema.parse(request.body)
  const org_id = request.user.org_id

  const makeUser = makeCreateUser()

  await makeUser.execute({
    name,
    email,
    password,
    org_id,
  })

  return reply.status(201).send()
}
