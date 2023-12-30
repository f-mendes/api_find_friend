import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  listByCity(city: string): Promise<Org[]>
}
