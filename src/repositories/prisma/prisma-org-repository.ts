import { prisma } from '@/lib/prisma'
import { OrgRepository } from '../interfaces/org-repository'
import { Prisma } from '@prisma/client'

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })
    return org
  }

  async listByCity(city: string) {
    const orgs = await prisma.org.findMany({ where: { city } })
    return orgs
  }
}
