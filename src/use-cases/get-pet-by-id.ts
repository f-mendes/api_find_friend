import { PetRepository } from '@/repositories/interfaces/pet-repository'
import { Pet } from '@prisma/client'

interface GetPetByIdRequest {
  id: string
}

interface GetPetByIdResponse {
  pet: Pet | null
}

export class GetPetByIdUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(data: GetPetByIdRequest): Promise<GetPetByIdResponse> {
    const pet = await this.petRepository.getById(data.id)

    return { pet }
  }
}
