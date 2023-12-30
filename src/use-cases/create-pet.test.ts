import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { MissingRequiredFields } from './errors/missing-required-fields-erros'

let petRepository: InMemoryPetRepository
let sut: CreatePetUseCase

describe('Create Pet', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new CreatePetUseCase(petRepository)
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'Thor',
      about: 'Cachorrinho fiadaputa',
      age: 'Filhote',
      size: 'Pequeno',
      org_id: 'org-1',
      PetImage: [
        { pet_id: 'uuid', url: 'url_da_imagem_1' },
        { pet_id: 'uuid', url: 'url_da_imagem_2' },
      ],
      PetRequirement: [
        { pet_id: 'uuid', name: 'Requisito 1' },
        { pet_id: 'uuid', name: 'Requisito 2' },
      ],
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Thor')
  })

  it('should not be able to create a new pet with org id not found', async () => {
    await expect(
      sut.execute({
        name: 'Thor',
        about: 'Cachorrinho fiadaputa',
        age: 'Filhote',
        size: 'Pequeno',
        org_id: '',
      }),
    ).rejects.toBeInstanceOf(MissingRequiredFields)
  })
})
