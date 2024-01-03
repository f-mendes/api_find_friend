import { UserRepository } from '@/repositories/interfaces/user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { hash } from 'bcryptjs'
import { MissingRequiredFields } from './errors/missing-required-fields-erros'

interface CreateUserRequest {
  name: string
  email: string
  password: string
  org_id: string
}
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserRequest) {
    if (!data.org_id) throw new MissingRequiredFields()

    const userAlreadyExists = await this.userRepository.findByEmail(data.email)

    if (userAlreadyExists) throw new UserAlreadyExistsError()

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password_hash: await hash(data.password, 6),
      org_id: data.org_id,
    })

    return { user }
  }
}
