import { Stack, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { CurrentOrderSummary } from '../components/customer/CurrentOrderSummary.tsx'
import { CustomerMenuSection } from '../components/customer/CustomerMenuSection.tsx'
import { CustomerPageAlerts } from '../components/customer/CustomerPageAlerts.tsx'
import { CustomerTabLayout } from '../components/customer/CustomerTabLayout.tsx'
import { MyOrdersSection } from '../components/customer/MyOrdersSection.tsx'
import { NewOrderTabContent } from '../components/customer/NewOrderTabContent.tsx'
import { AppShell } from '../components/layout/AppShell.tsx'
import { useCustomerOrderForm } from '../hooks/useCustomerOrderForm.ts'
import { usePizzaMenu } from '../hooks/usePizzaMenu.ts'
import { useTrackedOrders } from '../hooks/useTrackedOrders.ts'
import { formatPrice } from '../lib/format.ts'

type CustomerTab = 'new-order' | 'my-orders'

export function CustomerPage() {
  const { pizzas, isLoading: isLoadingMenu, error: menuError } = usePizzaMenu()
  const {
    orders: trackedOrders,
    isLoading: isLoadingOrders,
    error: trackedOrdersError,
    lastUpdatedAt,
    refreshOrders,
    addTrackedOrder,
  } = useTrackedOrders()

  const theme = useTheme()
  const isStickySummary = useMediaQuery(theme.breakpoints.up('lg'))
  const isCompactMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [activeTab, setActiveTab] = useState<CustomerTab>('new-order')
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false)

  const {
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
    clearSubmitError,
    clearSubmitSuccess,
  } = useCustomerOrderForm({
    pizzas,
    onOrderCreated: (createdOrder) => {
      addTrackedOrder(createdOrder)
      setIsMobileSummaryOpen(false)
      setActiveTab('my-orders')
    },
  })

  const currentTab = () => {
    switch (activeTab) {
      case 'new-order':
        return (
          <NewOrderTabContent
            isStickySummary={isStickySummary}
            isCompactMobile={isCompactMobile}
            hasSelectedItems={selectedItems.length > 0}
            selectedItemCount={selectedItemCount}
            estimatedTotalLabel={formatPrice(estimatedTotal)}
            isMobileSummaryOpen={isMobileSummaryOpen}
            onOpenMobileSummary={() => setIsMobileSummaryOpen(true)}
            onCloseMobileSummary={() => setIsMobileSummaryOpen(false)}
            menuContent={(
              <CustomerMenuSection
                pizzas={pizzas}
                isLoading={isLoadingMenu}
                error={menuError}
                quantities={quantities}
                onQuantityChange={updateQuantity}
              />
            )}
            summaryContent={(
              <CurrentOrderSummary
                customerName={customerName}
                selectedItems={selectedItems}
                estimatedTotal={estimatedTotal}
                isDesktop={isStickySummary}
                isSubmitting={isSubmitting}
                isLoadingMenu={isLoadingMenu}
                onCustomerNameChange={setCustomerName}
                onSubmitOrder={() => void submitOrder()}
              />
            )}
          />
        )

      case 'my-orders':
        return (
          <MyOrdersSection
            trackedOrders={trackedOrders}
            isLoading={isLoadingOrders}
            error={trackedOrdersError}
            lastUpdatedAt={lastUpdatedAt}
            onRefresh={() => void refreshOrders()}
          />
        )

      default:
        return null
    }
  }

  return (
    <AppShell>
      <Stack
        spacing={4}
        sx={{
          pt: { xs: 2, md: 3 },
          pb: { xs: activeTab === 'new-order' && isCompactMobile && selectedItems.length > 0 ? 12 : 3, md: 4 },
        }}
      >
        <CustomerTabLayout
          activeTab={activeTab}
          trackedOrdersCount={trackedOrders.length}
          onChange={setActiveTab}
        />

        <CustomerPageAlerts
          submitSuccess={submitSuccess}
          submitError={submitError}
          onCloseSuccess={clearSubmitSuccess}
          onCloseError={clearSubmitError}
        />

        {currentTab()}
      </Stack>
    </AppShell>
  )
}
