import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { MissingRequiredFields } from './errors/missing-required-fields-erros'
import { CreateUserUseCase } from './create-user'

let userRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create Org with user', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('should be able to create a new  user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      org_id: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.org_id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to create a new user with email already taken', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      org_id: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        org_id: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to create a new user without org_id', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        org_id: '',
      }),
    ).rejects.toBeInstanceOf(MissingRequiredFields)
  })
})
