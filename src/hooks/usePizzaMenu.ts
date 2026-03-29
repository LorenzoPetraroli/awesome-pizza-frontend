import { useContext } from 'react'
import { PizzaMenuContext } from '../contexts/PizzaMenuContextValue.ts'

export function usePizzaMenu() {
  const context = useContext(PizzaMenuContext)

  if (!context) {
    throw new Error('usePizzaMenu must be used within a PizzaMenuProvider.')
  }

  return context
}
