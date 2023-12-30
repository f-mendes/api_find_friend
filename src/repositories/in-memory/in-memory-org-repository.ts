import { randomUUID } from 'crypto'
import { OrgRepository } from '../interfaces/org-repository'
import { Org, Prisma } from '@prisma/client'

export class InMemoryOrgRepository implements OrgRepository {
  private orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      address: data.address,
      city: data.city,
      zipcode: data.zipcode,
      whatsapp: data.whatsapp,
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }

  async listByCity(city: string) {
    const orgs = this.orgs.filter((org) => org.city === city)

    return orgs
  }
}
