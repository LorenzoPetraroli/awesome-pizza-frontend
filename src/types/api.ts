export type PriceValue = number | string

export type PizzaTypeResponse = {
  type: string
  name: string
  ingredientsDescription: string
  unitPrice: PriceValue
}

export type CreateOrderItemRequest = {
  pizzaType: string
  quantity: number
}

export type CreateOrderRequest = {
  customerName: string
  items: CreateOrderItemRequest[]
}

export type OrderItemResponse = {
  pizzaType: string
  displayName: string
  quantity: number
  unitPrice: PriceValue
  lineTotal: PriceValue
}

export type OrderStatus = 'PLACED' | 'IN_PREPARATION' | 'READY' | 'COMPLETED'

export type OrderResponse = {
  code: string
  customerName: string
  status: OrderStatus
  items: OrderItemResponse[]
  totalPrice: PriceValue
  createdAt: string
  updatedAt: string
  completedAt: string | null
}

export type KitchenSummaryResponse = {
  currentOrder: OrderResponse | null
  queuedOrders: OrderResponse[]
  readyOrders: OrderResponse[]
}
