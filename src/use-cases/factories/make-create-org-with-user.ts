import { CreateOrgWithUserUseCase } from '../create-org-with-user'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeCreateOrgWithUser() {
  const orgRepository = new PrismaOrgRepository()
  const userRepository = new PrismaUserRepository()

  const createOrgWithUserUseCase = new CreateOrgWithUserUseCase(
    userRepository,
    orgRepository,
  )
  return createOrgWithUserUseCase
}
