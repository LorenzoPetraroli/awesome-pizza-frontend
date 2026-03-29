const trackedOrdersStorageKey = 'awesome-pizza.tracked-order-codes'

export function getTrackedOrderCodes() {
  if (typeof window === 'undefined') {
    return [] as string[]
  }

  try {
    const rawValue = window.localStorage.getItem(trackedOrdersStorageKey)

    if (!rawValue) {
      return [] as string[]
    }

    const parsedValue = JSON.parse(rawValue) as string[]
    return Array.isArray(parsedValue) ? parsedValue : []
  } catch {
    return [] as string[]
  }
}

export function saveTrackedOrderCode(code: string) {
  if (typeof window === 'undefined') {
    return
  }

  const nextCodes = [code, ...getTrackedOrderCodes().filter((item) => item !== code)]
  window.localStorage.setItem(trackedOrdersStorageKey, JSON.stringify(nextCodes))
}
