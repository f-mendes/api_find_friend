import { randomUUID } from 'crypto'
import { UserRepository } from '../interfaces/user-repository'
import { User, Prisma } from '@prisma/client'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async create(data: Prisma.UserUncheckedCreateInput) {
    const createUser = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.users.push(createUser)

    return createUser
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    return user || null
  }
}
