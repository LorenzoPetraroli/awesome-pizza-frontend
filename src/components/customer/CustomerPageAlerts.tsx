import { Alert } from '@mui/material'
import type { OrderResponse } from '../../types/api.ts'

type CustomerPageAlertsProps = {
  submitSuccess: OrderResponse | null
  submitError: string | null
  onCloseSuccess: () => void
  onCloseError: () => void
}

export function CustomerPageAlerts({
  submitSuccess,
  submitError,
  onCloseSuccess,
  onCloseError,
}: CustomerPageAlertsProps) {
  return (
    <>
      {submitSuccess ? (
        <Alert severity="success" onClose={onCloseSuccess}>
          Order created successfully. Code: <strong>{submitSuccess.code}</strong>
        </Alert>
      ) : null}

      {submitError ? (
        <Alert severity="error" onClose={onCloseError}>
          {submitError}
        </Alert>
      ) : null}
    </>
  )
}
