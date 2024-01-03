import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePet() {
  const petRepository = new PrismaPetRepository()
  const useCase = new CreatePetUseCase(petRepository)
  return useCase
}
