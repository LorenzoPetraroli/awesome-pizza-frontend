import { apiRequest } from './http.ts'
import type { CreateOrderRequest, OrderResponse, PizzaTypeResponse } from '../types/api.ts'

export function getPizzas() {
  return apiRequest<PizzaTypeResponse[]>('/api/pizzas')
}

export function createOrder(payload: CreateOrderRequest) {
  return apiRequest<OrderResponse>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getOrderByCode(code: string) {
  return apiRequest<OrderResponse>(`/api/orders/${code}`)
}
