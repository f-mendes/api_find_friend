import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUser } from '@/use-cases/factories/make-authenticate-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = schema.parse(request.body)
  try {
    const makeAuthenticate = makeAuthenticateUser()

    const { user } = await makeAuthenticate.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      { org_id: user.org_id },
      { sign: { sub: user.id } },
    )

    const refreshToken = await reply.jwtSign(
      { org_id: user.org_id },
      { sign: { sub: user.id, expiresIn: '7d' } },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
