import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgWithUserUseCase } from './create-org-with-user'

let userRepository: InMemoryUserRepository
let orgRepository: InMemoryOrgRepository
let sut: CreateOrgWithUserUseCase

describe('Create Org with user', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new CreateOrgWithUserUseCase(userRepository, orgRepository)
  })

  it('should be able to create a new org with user', async () => {
    const { org } = await sut.execute({
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
      org: {
        address: 'Rua 1',
        zipcode: '12345678',
        whatsapp: '11912345678',
      },
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('John Doe')
  })
})
