import { apiRequest } from './http.ts'
import type { KitchenSummaryResponse, OrderResponse } from '../types/api.ts'

export function getKitchenSummary() {
  return apiRequest<KitchenSummaryResponse>('/api/kitchen/summary')
}

export function startKitchenOrder(code: string) {
  return apiRequest<OrderResponse>(`/api/kitchen/orders/${code}/start`, {
    method: 'POST',
  })
}

export function markKitchenOrderReady(code: string) {
  return apiRequest<OrderResponse>(`/api/kitchen/orders/${code}/ready`, {
    method: 'PATCH',
  })
}

export function completeKitchenOrder(code: string) {
  return apiRequest<OrderResponse>(`/api/kitchen/orders/${code}/complete`, {
    method: 'PATCH',
  })
}
