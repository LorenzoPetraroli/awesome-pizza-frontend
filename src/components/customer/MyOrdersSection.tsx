import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { formatDateTime, formatOrderStatus, formatPrice, formatRefreshDateTime } from '../../lib/format.ts'
import type { OrderResponse, OrderStatus } from '../../types/api.ts'

function getStatusColor(status: OrderStatus) {
  switch (status) {
    case 'PLACED':
      return 'info'
    case 'IN_PREPARATION':
      return 'warning'
    case 'READY':
      return 'success'
    case 'COMPLETED':
      return 'default'
  }
}

type MyOrdersSectionProps = {
  trackedOrders: OrderResponse[]
  isLoading: boolean
  error: string | null
  lastUpdatedAt: string | null
  onRefresh: () => void
}

export function MyOrdersSection({
  trackedOrders,
  isLoading,
  error,
  lastUpdatedAt,
  onRefresh,
}: MyOrdersSectionProps) {
  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Box>
              <Typography variant="h5">My orders</Typography>
              <Typography color="text.secondary">
                Orders created from this browser are refreshed automatically every 10 seconds while active.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last updated: {formatRefreshDateTime(lastUpdatedAt)}
              </Typography>
            </Box>
            <IconButton aria-label="Refresh tracked orders" onClick={onRefresh}>
              <RefreshRoundedIcon />
            </IconButton>
          </Stack>

          {error ? <Alert severity="error">{error}</Alert> : null}

          {isLoading && trackedOrders.length === 0 ? (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CircularProgress size={24} />
              <Typography color="text.secondary">Loading tracked orders...</Typography>
            </Stack>
          ) : trackedOrders.length === 0 ? (
            <Typography color="text.secondary">
              No tracked orders yet. Create your first order and it will appear here.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {trackedOrders.map((order) => (
                <Card key={order.code} variant="outlined">
                  <CardContent sx={{ p: 2.25 }}>
                    <Stack spacing={1.5}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                      >
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap">
                            <Typography variant="h6">{order.customerName}</Typography>
                            <Chip
                              size="small"
                              icon={<ReceiptLongRoundedIcon />}
                              label={order.code}
                              variant="outlined"
                            />
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            Created: {formatDateTime(order.createdAt)}
                          </Typography>
                        </Box>
                        <Chip label={formatOrderStatus(order.status)} color={getStatusColor(order.status)} />
                      </Stack>

                      <Stack spacing={1}>
                        {order.items.map((item) => (
                          <Box
                            key={`${order.code}-${item.pizzaType}`}
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: 'minmax(0, 1fr) auto',
                              gap: 1,
                              alignItems: 'start',
                            }}
                          >
                            <Box>
                              <Typography>{item.displayName}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.quantity} x {formatPrice(item.unitPrice)}
                              </Typography>
                            </Box>
                            <Typography>{formatPrice(item.lineTotal)}</Typography>
                          </Box>
                        ))}
                      </Stack>

                      <Divider flexItem />

                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                      >
                        <Typography fontWeight={700}>Total: {formatPrice(order.totalPrice)}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Updated: {formatDateTime(order.updatedAt)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
