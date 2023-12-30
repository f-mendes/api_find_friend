import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListPetByCityUseCase } from './list-pet-by-city'

let petRepository: InMemoryPetRepository
let orgRepository: InMemoryOrgRepository
let sut: ListPetByCityUseCase

describe('List Pet By City', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    orgRepository = new InMemoryOrgRepository()
    sut = new ListPetByCityUseCase(orgRepository, petRepository)
  })

  it('should be able to list pets by city', async () => {
    const org1 = await orgRepository.create({
      name: 'Org 1',
      address: 'Rua 1',
      city: 'São Paulo',
      zipcode: '12345678',
      whatsapp: '11912345678',
    })

    const org2 = await orgRepository.create({
      name: 'Org 2',
      address: 'Rua 2',
      city: 'Recife',
      zipcode: '12345678',
      whatsapp: '11912345656',
    })

    await petRepository.create({
      name: 'Pet 1',
      about: 'About Pet 1',
      age: '1',
      size: 'P',
      org_id: org1.id,
    })

    await petRepository.create({
      name: 'Pet 2',
      about: 'About Pet 2',
      age: '2',
      size: 'M',
      org_id: org1.id,
    })

    await petRepository.create({
      name: 'Pet 3',
      about: 'About Pet 3',
      age: '3',
      size: 'G',
      org_id: org2.id,
    })

    const { pets } = await sut.execute({ city: 'São Paulo' })

    expect(pets.length).toBe(2)
  })
})
