import { randomUUID } from 'node:crypto'
import { PetRepository, PetFilters } from '../interfaces/pet-repository'
import { Pet, Prisma } from '@prisma/client'

export class InMemoryPetRepository implements PetRepository {
  private pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const petId = randomUUID()
    const pet = {
      id: petId,
      name: data.name,
      about: data.about || null,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level || null,
      independence_level: data.independence_level || null,
      created_at: new Date(),
      org_id: data.org_id,
      PetImage: data.PetImage?.create,
      PetRequirement: data.PetRequirement?.create,
    }

    if (pet.PetRequirement !== undefined) {
      for (const petImage of pet.PetRequirement as Prisma.PetRequirementUncheckedCreateInput[]) {
        petImage.id = randomUUID()
        petImage.pet_id = petId
        petImage.created_at = new Date()
      }
    }

    if (pet.PetImage !== undefined) {
      for (const petImage of pet.PetImage as Prisma.PetImageUncheckedCreateInput[]) {
        petImage.id = randomUUID()
        petImage.pet_id = petId
        petImage.created_at = new Date()
      }
    }

    this.pets.push(pet)

    return pet
  }

  async listByOrg(orgs_id: string[]) {
    const pets = orgs_id.map((org_id) => {
      return this.pets.filter((pet) => pet.org_id === org_id)
    })

    return pets.flat()
  }

  async searchByFields(fields: PetFilters, pets: Pet[]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { city, ...fieldsWithoutCity } = fields

    const petsFound = pets.filter((pet) => {
      const petFields = Object.keys(fieldsWithoutCity) as Array<
        keyof PetFilters
      >

      return petFields.every((field) => {
        if (!fields[field]) return true
        // @ts-expect-error: Unreachable code error
        return pet[field] === fields[field]
      })
    })

    return petsFound
  }

  async getById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) return null

    return pet
  }
}
