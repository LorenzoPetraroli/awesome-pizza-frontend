import type { PriceValue } from '../types/api.ts'

const currencyFormatter = new Intl.NumberFormat('en-IT', {
  style: 'currency',
  currency: 'EUR',
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const dateTimeWithSecondsFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'medium',
})

export function toPriceNumber(value: PriceValue) {
  return typeof value === 'number' ? value : Number(value)
}

export function formatPrice(value: PriceValue) {
  return currencyFormatter.format(toPriceNumber(value))
}

export function formatDateTime(value: string | null) {
  if (!value) {
    return 'Not completed yet'
  }

  return dateTimeFormatter.format(new Date(value))
}

export function formatRefreshDateTime(value: string | null) {
  if (!value) {
    return 'Not refreshed yet'
  }

  return dateTimeWithSecondsFormatter.format(new Date(value))
}
