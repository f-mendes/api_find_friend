import { OrgRepository } from '@/repositories/interfaces/org-repository'
import { UserRepository } from '@/repositories/interfaces/user-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrgWithUserUseCaseRequest {
  user: {
    name: string
    email: string
    password: string
  }
  org: {
    name?: string
    address: string
    zipcode: string
    whatsapp: string
  }
}

interface CreateOrgWithUserUseCaseResponse {
  org: Org
}

export class CreateOrgWithUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({
    user,
    org,
  }: CreateOrgWithUserUseCaseRequest): Promise<CreateOrgWithUserUseCaseResponse> {
    const orgCreated = await this.orgRepository.create({
      name: org.name || user.name,
      address: org.address,
      zipcode: org.zipcode,
      whatsapp: org.whatsapp,
    })

    await this.userRepository.create({
      name: user.name,
      email: user.email,
      password_hash: await hash(user.password, 6),
      org_id: orgCreated.id,
    })

    return {
      org: orgCreated,
    }
  }
}
