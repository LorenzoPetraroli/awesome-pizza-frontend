import { createContext } from 'react'
import type { PizzaTypeResponse } from '../types/api.ts'

export type PizzaMenuContextValue = {
  pizzas: PizzaTypeResponse[]
  isLoading: boolean
  error: string | null
  refreshPizzas: () => Promise<void>
}

export const PizzaMenuContext = createContext<PizzaMenuContextValue | null>(null)
