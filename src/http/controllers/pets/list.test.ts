import request from 'supertest'
import { app } from '@/app'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('List Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets by fields', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Org 1',
        address: 'Rua 1',
        city: 'Recife',
        zipcode: '04300000',
        whatsapp: '11966435666',
      },
    })

    await prisma.pet.create({
      data: {
        name: 'Thor',
        about: 'Cachorrinho fiadaputa',
        age: 'Filhote',
        size: 'Pequeno',
        org_id: org.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'Bob',
        about: 'Cachorrinho fiadaputa',
        age: 'Adulto',
        size: 'Médio',
        org_id: org.id,
      },
    })

    const pets = await request(app.server).get(
      '/pets?city=Recife&age=Filhote&size=Pequeno',
    )

    expect(pets.body.pets.length).toEqual(1)
    expect(pets.body.pets[0].name).toEqual('Thor')
  })
})
