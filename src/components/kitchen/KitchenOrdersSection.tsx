import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { formatDateTime, formatOrderStatus, formatPrice, formatRefreshDateTime } from '../../lib/format.ts'
import type { OrderResponse, OrderStatus } from '../../types/api.ts'

type KitchenOrdersSectionProps = {
  orders: OrderResponse[]
  isLoading: boolean
  error: string | null
  actionError: string | null
  lastUpdatedAt: string | null
  pendingOrderCode: string | null
  onRefresh: () => void
  onStartOrder: (code: string) => void
  onMarkReady: (code: string) => void
  onCompleteOrder: (code: string) => void
  onCloseActionError: () => void
}

function getStatusColor(status: OrderStatus): 'default' | 'info' | 'success' {
  switch (status) {
    case 'IN_PREPARATION':
      return 'info'
    case 'READY':
      return 'success'
    default:
      return 'default'
  }
}

function getActionLabel(status: OrderStatus) {
  switch (status) {
    case 'PLACED':
      return 'Start order'
    case 'IN_PREPARATION':
      return 'Mark ready'
    case 'READY':
      return 'Complete order'
    default:
      return null
  }
}

export function KitchenOrdersSection({
  orders,
  isLoading,
  error,
  actionError,
  lastUpdatedAt,
  pendingOrderCode,
  onRefresh,
  onStartOrder,
  onMarkReady,
  onCompleteOrder,
  onCloseActionError,
}: KitchenOrdersSectionProps) {
  const hasOrders = orders.length > 0

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Stack spacing={1.25}>
              <Typography variant="overline" color="primary.light">
                Kitchen area
              </Typography>
              <Typography
                variant="h3"
                maxWidth="15ch"
                sx={{ fontSize: { xs: '1.9rem', sm: '2.2rem', md: undefined } }}
              >
                Run the live queue and move one order at a time.
              </Typography>
              <Typography color="text.secondary" maxWidth="68ch">
                Follow the backend summary, take one order in preparation,
                then move it to ready and complete it manually.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last updated: {formatRefreshDateTime(lastUpdatedAt)}
              </Typography>
            </Stack>

            <Button
              variant="outlined"
              color="secondary"
              startIcon={<RefreshRoundedIcon />}
              onClick={onRefresh}
              disabled={Boolean(pendingOrderCode)}
            >
              Refresh queue
            </Button>
          </Stack>

          {error ? <Alert severity="error">{error}</Alert> : null}
          {actionError ? (
            <Alert severity="error" onClose={onCloseActionError}>
              {actionError}
            </Alert>
          ) : null}

          {isLoading ? (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CircularProgress size={24} />
              <Typography color="text.secondary">Loading kitchen summary...</Typography>
            </Stack>
          ) : !hasOrders ? (
            <Box
              sx={{
                borderRadius: 3,
                border: '1px dashed',
                borderColor: 'divider',
                p: 3,
              }}
            >
              <Typography variant="h6">No active kitchen orders</Typography>
              <Typography color="text.secondary">
                New orders will appear here as soon as customers place them.
              </Typography>
            </Box>
          ) : (
            <Stack divider={<Divider flexItem />}>
              {orders.map((order) => {
                const isPending = pendingOrderCode === order.code
                const actionLabel = getActionLabel(order.status)

                return (
                  <Box
                    key={order.code}
                    sx={{
                      py: 2.5,
                    }}
                  >
                    <Stack spacing={2}>
                      <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={1.5}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                      >
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          <Chip label={formatOrderStatus(order.status)} color={getStatusColor(order.status)} />
                          <Chip label={order.code} variant="outlined" />
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                          <Typography variant="body2" color="text.secondary">
                            Updated: {formatDateTime(order.updatedAt)}
                          </Typography>
                          <Button
                            variant="contained"
                            color={order.status === 'READY' ? 'secondary' : 'primary'}
                            onClick={() => {
                              switch (order.status) {
                                case 'PLACED':
                                  onStartOrder(order.code)
                                  break
                                case 'IN_PREPARATION':
                                  onMarkReady(order.code)
                                  break
                                case 'READY':
                                  onCompleteOrder(order.code)
                                  break
                              }
                            }}
                            disabled={isPending}
                          >
                            {isPending ? 'Updating...' : actionLabel}
                          </Button>
                        </Stack>
                      </Stack>

                      <Box>
                        <Typography variant="h6">{order.customerName}</Typography>
                        <Typography color="text.secondary">
                          Created: {formatDateTime(order.createdAt)}
                        </Typography>
                      </Box>

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
                            <Typography color="text.secondary">
                              {item.quantity} x {item.displayName}
                            </Typography>
                            <Typography color="text.secondary">{formatPrice(item.lineTotal)}</Typography>
                          </Box>
                        ))}
                      </Stack>

                      <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={1.5}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Advance the order manually when the kitchen reaches the next step.
                        </Typography>
                        <Typography variant="h6">{formatPrice(order.totalPrice)}</Typography>
                      </Stack>
                    </Stack>
                  </Box>
                )
              })}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}