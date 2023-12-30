import { PetRepository } from '@/repositories/interfaces/pet-repository'
import { Pet, Prisma } from '@prisma/client'
import { MissingRequiredFields } from './errors/missing-required-fields-erros'

interface CreatePetRequest {
  name: string
  about?: string
  age: string
  size: string
  energy_level?: string
  independence_level?: string
  org_id: string
  PetImage?: Array<Prisma.PetImageUncheckedCreateInput>
  PetRequirement?: Array<Prisma.PetRequirementUncheckedCreateInput>
}

interface CreatePetResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(data: CreatePetRequest): Promise<CreatePetResponse> {
    if (data.org_id === '' || data.org_id === undefined) {
      throw new MissingRequiredFields()
    }

    const pet = await this.petRepository.create({
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      org_id: data.org_id,
      PetImage: {
        create: data.PetImage,
      },
      PetRequirement: {
        create: data.PetRequirement,
      },
    })

    return { pet }
  }
}
