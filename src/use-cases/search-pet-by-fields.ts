import { OrgRepository } from '@/repositories/interfaces/org-repository'
import {
  PetRepository,
  PetFilters,
} from '@/repositories/interfaces/pet-repository'
import { Pet } from '@prisma/client'

interface SearchPetByFieldsRequest {
  fields: PetFilters
  page: number
  in_memory?: boolean
  org_repository?: OrgRepository
}

interface SearchPetByFieldsResponse {
  pets: Pet[]
}

export class SearchPetByFieldsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: SearchPetByFieldsRequest,
  ): Promise<SearchPetByFieldsResponse> {
    if (!data.fields.city) {
      throw new Error('City is required')
    }

    if (data.in_memory && data.org_repository) {
      const orgs = await data.org_repository.listByCity(data.fields.city)
      const orgs_id = orgs.map((org) => org.id)

      const petsByCity = await this.petRepository.listByOrg(orgs_id)

      const pets = await this.petRepository.searchByFields(
        data.fields,
        data.page,
        petsByCity,
      )
      return { pets }
    }

    const pets = await this.petRepository.searchByFields(data.fields, data.page)
    return { pets }
  }
}
