import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { SearchPetByFieldsUseCase } from './search-pet-by-fields'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: SearchPetByFieldsUseCase

describe('Search Pet By Fields', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new SearchPetByFieldsUseCase(orgRepository, petRepository)
  })

  it('should be able to search pets by fields', async () => {
    const org = await orgRepository.create({
      name: 'Org 1',
      address: 'Rua 1',
      city: 'São Paulo',
      zipcode: '12345678',
      whatsapp: '11912345678',
    })

    await petRepository.create({
      name: 'Pet 1',
      about: 'About Pet 1',
      age: '1',
      size: 'P',
      energy_level: 'low',
      independence_level: 'low',
      org_id: org.id,
    })

    await petRepository.create({
      name: 'Pet 2',
      about: 'About Pet 2',
      age: '2',
      size: 'M',
      org_id: org.id,
    })

    await petRepository.create({
      name: 'Pet 3',
      about: 'About Pet 3',
      age: '3',
      size: 'M',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      fields: {
        age: '',
        size: 'P',
        energy_level: 'low',
        independence_level: '',
      },
    })

    expect(pets.length).toBe(1)
  })
})
