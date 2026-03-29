import { useCallback, useEffect, useRef, useState } from 'react'
import { getOrderByCode } from '../api/customer.ts'
import { usePolling } from './usePolling.ts'
import { getTrackedOrderCodes, saveTrackedOrderCode } from '../lib/trackedOrders.ts'
import type { OrderResponse } from '../types/api.ts'

function sortOrdersByDate(orders: OrderResponse[]) {
  return [...orders].sort((left, right) => {
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
  })
}

export function useTrackedOrders() {
  const initialCodesRef = useRef<string[]>(getTrackedOrderCodes())
  const [trackedCodes, setTrackedCodes] = useState<string[]>([])
  const [orders, setOrders] = useState<OrderResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null)

  const refreshOrders = useCallback(async (codes = trackedCodes) => {
    if (codes.length === 0) {
      setOrders([])
      setError(null)
      setLastUpdatedAt(null)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const response = await Promise.all(codes.map((code) => getOrderByCode(code)))
      setOrders((currentOrders) => {
        const completedOrders = currentOrders.filter(
          (order) => order.status === 'COMPLETED' && !codes.includes(order.code),
        )

        return sortOrdersByDate([...completedOrders, ...response])
      })
      setLastUpdatedAt(new Date().toISOString())
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : 'Unable to refresh tracked orders.')
    } finally {
      setIsLoading(false)
    }
  }, [trackedCodes])

  useEffect(() => {
    const initialCodes = initialCodesRef.current
    setTrackedCodes(initialCodes)
    void refreshOrders(initialCodes)
    // The initial storage sync is intentionally executed only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeTrackedCodes = orders.length === 0
    ? trackedCodes
    : trackedCodes.filter((code) => orders.find((order) => order.code === code)?.status !== 'COMPLETED')

  usePolling(() => refreshOrders(activeTrackedCodes), {
    enabled: activeTrackedCodes.length > 0,
    intervalMs: 10000,
  })

  const addTrackedOrder = useCallback((order: OrderResponse) => {
    saveTrackedOrderCode(order.code)

    setTrackedCodes((currentCodes) => {
      const nextCodes = [order.code, ...currentCodes.filter((code) => code !== order.code)]
      return nextCodes
    })

    setOrders((currentOrders) => {
      const nextOrders = [order, ...currentOrders.filter((item) => item.code !== order.code)]
      return sortOrdersByDate(nextOrders)
    })

    setLastUpdatedAt(new Date().toISOString())
  }, [])

  return {
    trackedCodes,
    orders,
    isLoading,
    error,
    lastUpdatedAt,
    refreshOrders,
    addTrackedOrder,
  }
}
