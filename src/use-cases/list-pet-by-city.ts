import { OrgRepository } from '@/repositories/interfaces/org-repository'
import { PetRepository } from '@/repositories/interfaces/pet-repository'
import { Pet } from '@prisma/client'

interface ListPetByCityRequest {
  city: string
}

interface ListPetByCityResponse {
  pets: Pet[]
}
export class ListPetByCityUseCase {
  constructor(
    private orgRepository: OrgRepository,
    private petRepository: PetRepository,
  ) {}

  async execute(data: ListPetByCityRequest): Promise<ListPetByCityResponse> {
    const orgs = await this.orgRepository.listByCity(data.city)
    const orgs_id = orgs.map((org) => org.id)

    const pets = await this.petRepository.listByOrg(orgs_id)

    return { pets }
  }
}
