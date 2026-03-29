import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { formatPrice, toPriceNumber } from '../../lib/format.ts'
import type { PizzaTypeResponse } from '../../types/api.ts'

type SelectedOrderItem = {
  pizza: PizzaTypeResponse
  quantity: number
}

type CurrentOrderSummaryProps = {
  customerName: string
  selectedItems: SelectedOrderItem[]
  estimatedTotal: number
  isDesktop: boolean
  isSubmitting: boolean
  isLoadingMenu: boolean
  onCustomerNameChange: (value: string) => void
  onSubmitOrder: () => void
}

export function CurrentOrderSummary({
  customerName,
  selectedItems,
  estimatedTotal,
  isDesktop,
  isSubmitting,
  isLoadingMenu,
  onCustomerNameChange,
  onSubmitOrder,
}: CurrentOrderSummaryProps) {
  const orderItemsContent = selectedItems.length === 0 ? (
    <Typography color="text.secondary">
      Add pizzas from the menu to see the order summary in real time.
    </Typography>
  ) : (
    <Stack spacing={1.5}>
      {selectedItems.map((item) => (
        <Box
          key={item.pizza.type}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            gap: 1,
            alignItems: 'start',
          }}
        >
          <Box>
            <Typography fontWeight={700}>{item.pizza.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.quantity} x {formatPrice(item.pizza.unitPrice)}
            </Typography>
          </Box>
          <Typography>{formatPrice(toPriceNumber(item.pizza.unitPrice) * item.quantity)}</Typography>
        </Box>
      ))}
    </Stack>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        ...(isDesktop
          ? {
              maxHeight: 'calc(100vh - 200px)',
              minHeight: 0,
            }
          : {}),
      }}
    >
      <Box>
        <Stack spacing={0.5}>
          <Typography variant="h5">Current order</Typography>
          <Typography variant="body2" color="text.secondary">
            Review the order summary live and create the order when ready.
          </Typography>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <TextField
            label="Customer name"
            placeholder="Mario Rossi"
            value={customerName}
            onChange={(event) => onCustomerNameChange(event.target.value)}
            fullWidth
          />
        </Box>
      </Box>

      <Divider flexItem />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: isDesktop ? 'auto' : 'visible',
          pr: isDesktop ? 0.5 : 0,
        }}
      >
        {orderItemsContent}
      </Box>

      <Divider flexItem />

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6">Estimated total</Typography>
          <Typography variant="h5">{formatPrice(estimatedTotal)}</Typography>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          onClick={onSubmitOrder}
          disabled={isSubmitting || isLoadingMenu}
          fullWidth
        >
          {isSubmitting ? 'Creating order...' : 'Create order'}
        </Button>
      </Box>
    </Box>
  )
}
