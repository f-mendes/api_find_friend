import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new user', async () => {
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
      .post('/users')
      .set('Cookie', cookies)
      .send({
        name: 'Isaac',
        email: 'isaac@mail.com',
        password: '123456',
      })

    expect(response.status).toBe(201)
  })
})
