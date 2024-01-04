import { Org, Pet, PetImage, PetRequirement, Prisma } from '@prisma/client'

export interface PetFilters {
  city: string
  age?: string
  size?: string
  energy_level?: string
  independence_level?: string
}

export interface PetWithInclude extends Pet {
  org: Org
  PetImage: PetImage[]
  PetRequirement: PetRequirement[]
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  listByOrg(orgs_id: Array<string>): Promise<Pet[]>
  searchByFields(fields: PetFilters, pets?: Array<Pet>): Promise<Pet[]>
  getById(id: string): Promise<PetWithInclude | null>
}
