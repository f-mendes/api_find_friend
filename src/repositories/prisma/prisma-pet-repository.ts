import { Prisma } from '@prisma/client'
import { PetFilters, PetRepository } from '../interfaces/pet-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async listByOrg(orgs_id: string[]) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgs_id,
        },
      },
    })

    return pets
  }

  async searchByFields(fields: PetFilters) {
    const orgs = await prisma.org.findMany({
      where: {
        city: fields.city,
      },
      include: {
        Pet: {
          where: {
            age: fields.age,
            size: fields.size,
            energy_level: fields.energy_level,
            independence_level: fields.independence_level,
          },
        },
      },
    })

    const pets = orgs.map((org) => org.Pet).flat()
    return pets
  }

  async getById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })
    return pet
  }
}
