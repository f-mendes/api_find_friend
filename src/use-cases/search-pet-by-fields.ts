import { OrgRepository } from '@/repositories/interfaces/org-repository'
import {
  PetRepository,
  PetFilters,
} from '@/repositories/interfaces/pet-repository'
import { Pet } from '@prisma/client'

interface SearchPetByFieldsRequest {
  city: string
  fields: PetFilters
}

interface SearchPetByFieldsResponse {
  pets: Pet[]
}

export class SearchPetByFieldsUseCase {
  constructor(
    private orgRepository: OrgRepository,
    private petRepository: PetRepository,
  ) {}

  async execute(
    data: SearchPetByFieldsRequest,
  ): Promise<SearchPetByFieldsResponse> {
    if (!data.city) {
      throw new Error('City is required')
    }

    const orgs = await this.orgRepository.listByCity(data.city)
    const orgs_id = orgs.map((org) => org.id)

    const petsByCity = await this.petRepository.listByOrg(orgs_id)

    const pets = await this.petRepository.searchByFields(
      petsByCity,
      data.fields,
    )

    return { pets }
  }
}
