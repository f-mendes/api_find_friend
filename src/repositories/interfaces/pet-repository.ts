import { Pet, Prisma } from '@prisma/client'

export interface PetFilters {
  age?: string
  size?: string
  energy_level?: string
  independence_level?: string
}
export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  listByOrg(orgs_id: Array<string>): Promise<Pet[]>
  searchByFields(pets: Array<Pet>, fields: PetFilters): Promise<Pet[]>
  getById(id: string): Promise<Pet | null>
}
