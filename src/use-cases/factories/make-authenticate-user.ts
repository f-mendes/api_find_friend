import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateUserUseCase } from '../authenticate'

export function makeAuthenticateUser() {
  const userRepositoy = new PrismaUserRepository()
  const useCase = new AuthenticateUserUseCase(userRepositoy)
  return useCase
}
