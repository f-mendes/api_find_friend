import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  listByOrg(orgs_id: Array<string>): Promise<Pet[]>
}
