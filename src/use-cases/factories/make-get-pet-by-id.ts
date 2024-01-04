import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetByIdUseCase } from '../get-pet-by-id'

export function makeGetPetById() {
  const petRepository = new PrismaPetRepository()
  const useCase = new GetPetByIdUseCase(petRepository)
  return useCase
}
