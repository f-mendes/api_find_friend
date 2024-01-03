import request from 'supertest'
import { app } from '@/app'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

describe('Create Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        user: {
          name: 'Jhon Doe',
          email: 'jhondoe@example.com',
          password: '123456',
        },
        org: {
          address: 'Rua 1',
          city: 'São Paulo',
          zipcode: '04300000',
          whatsapp: '11966435666',
        },
      })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'jhondoe@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .post('/pets')
      .set('Cookie', cookies)
      .field('name', 'Thor')
      .field('about', 'Cachorrinho fiadaputa')
      .field('age', 'Filhote')
      .field('size', 'Pequeno')
      .field('petRequirement', 'Requisito 1')

    expect(response.status).toBe(201)
  })
})
