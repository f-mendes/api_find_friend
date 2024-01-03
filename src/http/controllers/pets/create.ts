import { makeCreatePet } from '@/use-cases/factories/make-create-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string(),
    about: z.string().optional(),
    age: z.string(),
    size: z.string(),
    org_id: z.string().optional(),
    energy_level: z.string().optional(),
    independence_level: z.string().optional(),
    petRequirement: z
      .custom((value) => {
        if (Array.isArray(value) || typeof value === 'string') {
          return true
        }

        return false
      })
      .optional(),
  })

  const schemaImage = z.array(
    z.object({
      path: z.string(),
    }),
  )

  const {
    name,
    about,
    age,
    size,
    org_id: id,
    energy_level,
    independence_level,
    petRequirement: requirements,
  } = schema.parse(request.body)

  const images = schemaImage.parse(request.files)

  const petImage = images.map((image) => {
    return {
      url: image.path,
    }
  })

  let petRequirement

  if (typeof requirements === 'string') {
    petRequirement = [{ name: requirements }]
  }

  if (Array.isArray(requirements)) {
    petRequirement = requirements.map((requirement: string) => {
      return {
        name: requirement,
      }
    })
  }

  const org_id = id || 'a5783af5-742a-4c34-8e00-79b6d4efc7ea'

  const createPet = makeCreatePet()

  await createPet.execute({
    name,
    about,
    age,
    size,
    org_id,
    energy_level,
    independence_level,
    petImage,
    petRequirement,
  })

  reply.status(201).send()
}
