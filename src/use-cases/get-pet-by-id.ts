import {
  PetRepository,
  PetWithInclude,
} from '@/repositories/interfaces/pet-repository'

interface GetPetByIdRequest {
  id: string
}

interface GetPetByIdResponse {
  pet: PetWithInclude | null
}

export class GetPetByIdUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(data: GetPetByIdRequest): Promise<GetPetByIdResponse> {
    const pet = await this.petRepository.getById(data.id)

    return { pet }
  }
}
