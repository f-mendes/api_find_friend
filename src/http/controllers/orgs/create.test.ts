import request from 'supertest'
import { app } from '@/app'
import { describe, it, beforeAll, afterAll } from 'vitest'

describe('Create org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create org', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        user: {
          name: 'Isaac',
          email: 'isaac@mail.com',
          password: '123456',
        },
        org: {
          address: 'Rua 1',
          city: 'São Paulo',
          zipcode: '04300000',
          whatsapp: '11966435666',
        },
      })
      .expect(201)
  })
})
