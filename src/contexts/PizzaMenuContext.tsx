import { useCallback, useEffect, useMemo, useState } from 'react'
import { getPizzas } from '../api/customer.ts'
import type { PizzaTypeResponse } from '../types/api.ts'
import { PizzaMenuContext } from './PizzaMenuContextValue.ts'
import type { PizzaMenuContextValue } from './PizzaMenuContextValue.ts'

type PizzaMenuProviderProps = {
  children: React.ReactNode
}

export function PizzaMenuProvider({ children }: PizzaMenuProviderProps) {
  const [pizzas, setPizzas] = useState<PizzaTypeResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshPizzas = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getPizzas()
      setPizzas(response)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load the menu right now.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshPizzas()
  }, [refreshPizzas])

  const value = useMemo<PizzaMenuContextValue>(
    () => ({
      pizzas,
      isLoading,
      error,
      refreshPizzas,
    }),
    [error, isLoading, pizzas, refreshPizzas],
  )

  return <PizzaMenuContext.Provider value={value}>{children}</PizzaMenuContext.Provider>
}
