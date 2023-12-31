import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetByFieldsUseCase } from '../search-pet-by-fields'

export function makeSearchPetByFields() {
  const petRepository = new PrismaPetRepository()
  const useCase = new SearchPetByFieldsUseCase(petRepository)
  return useCase
}
