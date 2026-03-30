import { Stack } from '@mui/material'
import { KitchenOrdersSection } from '../components/kitchen/KitchenOrdersSection.tsx'
import { AppShell } from '../components/layout/AppShell.tsx'
import { useKitchenSummary } from '../hooks/useKitchenSummary.ts'

export function KitchenPage() {
  const {
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
        <KitchenOrdersSection
          orders={orders}
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