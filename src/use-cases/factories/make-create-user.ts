import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateUserUseCase } from '../create-user'

export function makeCreateUser() {
  const userRepository = new PrismaUserRepository()
  const useCase = new CreateUserUseCase(userRepository)
  return useCase
}
