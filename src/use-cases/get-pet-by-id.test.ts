import { describe, beforeEach, it, expect } from 'vitest'
import { GetPetByIdUseCase } from './get-pet-by-id'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'

let petRepository: InMemoryPetRepository
let sut: GetPetByIdUseCase

describe('Get Pet By Id', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new GetPetByIdUseCase(petRepository)
  })

  it('should be able to get a pet by id', async () => {
    const pet = await petRepository.create({
      name: 'Pet 1',
      about: 'About Pet 1',
      age: '1',
      size: 'P',
      org_id: 'org_id',
    })

    const { pet: petFound } = await sut.execute({ id: pet.id })

    expect(petFound).toEqual(expect.objectContaining(pet))
  })
})
