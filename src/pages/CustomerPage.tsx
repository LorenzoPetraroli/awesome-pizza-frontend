import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { Button, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createOrder } from '../api/customer.ts'
import { CurrentOrderSummary } from '../components/customer/CurrentOrderSummary.tsx'
import { CustomerMenuSection } from '../components/customer/CustomerMenuSection.tsx'
import { CustomerPageAlerts } from '../components/customer/CustomerPageAlerts.tsx'
import { CustomerTabLayout } from '../components/customer/CustomerTabLayout.tsx'
import { MyOrdersSection } from '../components/customer/MyOrdersSection.tsx'
import { NewOrderTabContent } from '../components/customer/NewOrderTabContent.tsx'
import { AppShell } from '../components/layout/AppShell.tsx'
import { formatPrice, toPriceNumber } from '../lib/format.ts'
import { usePizzaMenu } from '../hooks/usePizzaMenu.ts'
import { useTrackedOrders } from '../hooks/useTrackedOrders.ts'
import type { OrderResponse } from '../types/api.ts'

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
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  const [activeTab, setActiveTab] = useState<CustomerTab>('new-order')
  const [customerName, setCustomerName] = useState('')
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<OrderResponse | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false)

  const selectedItems = pizzas
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

  async function handleSubmitOrder() {
    if (!customerName.trim()) {
      setSubmitError('Please enter the customer name before sending the order.')
      return
    }

    if (selectedItems.length === 0) {
      setSubmitError('Please add at least one pizza to the order.')
      return
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

      addTrackedOrder(createdOrder)
      setSubmitSuccess(createdOrder)
      setQuantities({})
      setCustomerName('')
      setIsMobileSummaryOpen(false)
      setActiveTab('my-orders')
    } catch (creationError) {
      setSubmitError(creationError instanceof Error ? creationError.message : 'Unable to create the order right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentTab = () => {
    switch (activeTab) {
      case 'new-order':
        return (
          <NewOrderTabContent
            isDesktop={isDesktop}
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
                isDesktop={isDesktop}
                isSubmitting={isSubmitting}
                isLoadingMenu={isLoadingMenu}
                onCustomerNameChange={setCustomerName}
                onSubmitOrder={() => void handleSubmitOrder()}
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
          pb: { xs: activeTab === 'new-order' && !isDesktop && selectedItems.length > 0 ? 12 : 3, md: 4 },
        }}
      >
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

        <CustomerTabLayout
          activeTab={activeTab}
          trackedOrdersCount={trackedOrders.length}
          onChange={setActiveTab}
        />

        <CustomerPageAlerts
          submitSuccess={submitSuccess}
          submitError={submitError}
          onCloseSuccess={() => setSubmitSuccess(null)}
          onCloseError={() => setSubmitError(null)}
        />

        {currentTab()}
      </Stack>
    </AppShell>
  )
}
