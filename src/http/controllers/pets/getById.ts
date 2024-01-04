import { makeGetPetById } from '@/use-cases/factories/make-get-pet-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    id: z.string().uuid(),
  })

  const { id } = schema.parse(request.params)

  const makeGetPet = makeGetPetById()

  const { pet: response } = await makeGetPet.execute({ id })

  if (!response) {
    return reply.status(404).send({
      message: 'Pet not found',
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { org_id, org, PetImage, PetRequirement, ...rest } = response

  const images = PetImage.map((image) => {
    return {
      id: image.id,
      url: image.url,
    }
  })

  const requirements = PetRequirement.map((requirement) => {
    return {
      id: requirement.id,
      name: requirement.name,
    }
  })

  return reply.status(200).send({
    pet: {
      ...rest,
      org,
      images,
      requirements,
    },
  })
}
