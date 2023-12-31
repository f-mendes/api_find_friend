import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateOrgWithUser } from '@/use-cases/factories/make-create-org-with-user'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    user: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    }),
    org: z.object({
      name: z.string().optional(),
      address: z.string(),
      city: z.string(),
      zipcode: z.string(),
      whatsapp: z.string(),
    }),
  })

  const { user, org } = schema.parse(request.body)

  const createOrgWithUser = makeCreateOrgWithUser()

  await createOrgWithUser.execute({
    user,
    org,
  })

  return reply.status(201).send()
}
