import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { KitchenOrdersSection } from '../components/kitchen/KitchenOrdersSection.tsx'
import { AppShell } from '../components/layout/AppShell.tsx'
import { useKitchenSummary } from '../hooks/useKitchenSummary.ts'

export function KitchenPage() {
  const {
    currentOrderCode,
    orders,
    isLoading,
    error,
    actionError,
    lastUpdatedAt,
    pendingOrderCode,
    refreshSummary,
    startOrder,
    markReady,
    completeOrder,
    clearActionError,
  } = useKitchenSummary()

  return (
    <AppShell>
      <Stack spacing={4} sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 3, md: 4 } }}>
        <Button
          component={Link}
          to="/"
          variant="text"
          color="secondary"
          startIcon={<ArrowBackRoundedIcon />}
          className="back-link"
        >
          Back to home
        </Button>

        <KitchenOrdersSection
          orders={orders}
          currentOrderCode={currentOrderCode}
          isLoading={isLoading}
          error={error}
          actionError={actionError}
          lastUpdatedAt={lastUpdatedAt}
          pendingOrderCode={pendingOrderCode}
          onRefresh={() => void refreshSummary()}
          onStartOrder={(code) => void startOrder(code)}
          onMarkReady={(code) => void markReady(code)}
          onCompleteOrder={(code) => void completeOrder(code)}
          onCloseActionError={clearActionError}
        />
      </Stack>
    </AppShell>
  )
}
