import { makeSearchPetByFields } from '@/use-cases/factories/make-search-pet-by-fields'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function listByFields(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    independence_level: z.string().optional(),
  })

  const { page, ...fields } = schema.parse(request.query)

  const makeSearchPet = makeSearchPetByFields()

  const pets = await makeSearchPet.execute({ fields, page })

  return reply.status(200).send(pets)
}
