import { useState } from 'react'
import { createOrder } from '../api/customer.ts'
import { toPriceNumber } from '../lib/format.ts'
import type { OrderResponse, PizzaTypeResponse } from '../types/api.ts'

type SelectedOrderItem = {
  pizza: PizzaTypeResponse
  quantity: number
}

type UseCustomerOrderFormParams = {
  pizzas: PizzaTypeResponse[]
  onOrderCreated: (order: OrderResponse) => void
}

export function useCustomerOrderForm({
  pizzas,
  onOrderCreated,
}: UseCustomerOrderFormParams) {
  const [customerName, setCustomerName] = useState('')
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<OrderResponse | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedItems: SelectedOrderItem[] = pizzas
    .map((pizza) => ({
      pizza,
      quantity: quantities[pizza.type] ?? 0,
    }))
    .filter((item) => item.quantity > 0)

  const selectedItemCount = selectedItems.reduce((total, item) => total + item.quantity, 0)

  const estimatedTotal = selectedItems.reduce((total, item) => {
    return total + toPriceNumber(item.pizza.unitPrice) * item.quantity
  }, 0)

  function updateQuantity(pizzaType: string, quantity: number) {
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [pizzaType]: Math.max(0, quantity),
    }))
  }

  async function submitOrder() {
    if (!customerName.trim()) {
      setSubmitError('Please enter the customer name before sending the order.')
      return null
    }

    if (selectedItems.length === 0) {
      setSubmitError('Please add at least one pizza to the order.')
      return null
    }

    try {
      setIsSubmitting(true)
      setSubmitError(null)

      const createdOrder = await createOrder({
        customerName: customerName.trim(),
        items: selectedItems.map((item) => ({
          pizzaType: item.pizza.type,
          quantity: item.quantity,
        })),
      })

      onOrderCreated(createdOrder)
      setSubmitSuccess(createdOrder)
      setQuantities({})
      setCustomerName('')

      return createdOrder
    } catch (creationError) {
      setSubmitError(creationError instanceof Error ? creationError.message : 'Unable to create the order right now.')
      return null
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    customerName,
    quantities,
    selectedItems,
    selectedItemCount,
    estimatedTotal,
    submitError,
    submitSuccess,
    isSubmitting,
    setCustomerName,
    updateQuantity,
    submitOrder,
    clearSubmitError: () => setSubmitError(null),
    clearSubmitSuccess: () => setSubmitSuccess(null),
  }
}
