import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../interfaces/user-repository'

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = await prisma.user.create({ data })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  }
}
