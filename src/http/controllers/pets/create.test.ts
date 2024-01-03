import request from 'supertest'
import { app } from '@/app'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Create Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Org 1',
        address: 'Rua 1',
        city: 'São Paulo',
        zipcode: '04300000',
        whatsapp: '11966435666',
      },
    })

    const response = await request(app.server)
      .post('/pets')
      .field('name', 'Thor')
      .field('about', 'Cachorrinho fiadaputa')
      .field('age', 'Filhote')
      .field('size', 'Pequeno')
      .field('org_id', org.id)
      .field('petRequirement', 'Requisito 1')

    expect(response.status).toBe(201)
  })
})
