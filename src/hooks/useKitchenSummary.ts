import { useEffect, useMemo, useState } from 'react'
import {
  completeKitchenOrder,
  getKitchenSummary,
  markKitchenOrderReady,
  startKitchenOrder,
} from '../api/kitchen.ts'
import { usePolling } from './usePolling.ts'
import type { KitchenSummaryResponse, OrderResponse } from '../types/api.ts'

function uniqueOrdersByCode(orders: OrderResponse[]) {
  const codes = new Set<string>()

  return orders.filter((order) => {
    if (codes.has(order.code)) {
      return false
    }

    codes.add(order.code)
    return true
  })
}

export function useKitchenSummary() {
  const [summary, setSummary] = useState<KitchenSummaryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null)
  const [pendingOrderCode, setPendingOrderCode] = useState<string | null>(null)

  async function refreshSummary(showLoader = false) {
    if (showLoader) {
      setIsLoading(true)
    }

    try {
      const nextSummary = await getKitchenSummary()

      setSummary(nextSummary)
      setError(null)
      setLastUpdatedAt(new Date().toISOString())
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : 'Unable to refresh the kitchen summary.')
    } finally {
      if (showLoader) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    void refreshSummary(true)
  }, [])

  usePolling(() => refreshSummary(), {
    intervalMs: 5000,
  })

  async function runKitchenAction(code: string, action: (orderCode: string) => Promise<OrderResponse>) {
    try {
      setPendingOrderCode(code)
      setActionError(null)

      await action(code)
      await refreshSummary()
    } catch (mutationError) {
      setActionError(mutationError instanceof Error ? mutationError.message : 'Unable to update the order status.')
    } finally {
      setPendingOrderCode(null)
    }
  }

  const orders = useMemo(() => {
    if (!summary) {
      return []
    }

    return uniqueOrdersByCode([
      ...(summary.currentOrder ? [summary.currentOrder] : []),
      ...summary.queuedOrders,
      ...summary.readyOrders,
    ])
  }, [summary])

  return {
    currentOrderCode: summary?.currentOrder?.code ?? null,
    orders,
    isLoading,
    error,
    actionError,
    lastUpdatedAt,
    pendingOrderCode,
    refreshSummary: () => refreshSummary(),
    startOrder: (code: string) => runKitchenAction(code, startKitchenOrder),
    markReady: (code: string) => runKitchenAction(code, markKitchenOrderReady),
    completeOrder: (code: string) => runKitchenAction(code, completeKitchenOrder),
    clearActionError: () => setActionError(null),
  }
}
