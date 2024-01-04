import request from 'supertest'
import { app } from '@/app'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Get a pet by id', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Org 1',
        address: 'Rua 1',
        city: 'São Paulo',
        zipcode: '04300000',
        whatsapp: '11966435666',
      },
    })

    const pet = await prisma.pet.create({
      data: {
        name: 'Thor',
        about: 'Cachorrinho fiadaputa',
        age: 'Filhote',
        size: 'Pequeno',
        org_id: org.id,
      },
    })

    const petResponse = await request(app.server).get(`/pets/${pet.id}`)

    expect(petResponse.status).toBe(200)
    expect(petResponse.body.pet.name).toBe('Thor')
  })
})
