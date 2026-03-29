import { Card, CardContent, Stack, Tab, Tabs, Typography } from '@mui/material'

type CustomerTab = 'new-order' | 'my-orders'

type CustomerTabLayoutProps = {
  activeTab: CustomerTab
  trackedOrdersCount: number
  onChange: (tab: CustomerTab) => void
}

export function CustomerTabLayout({ activeTab, trackedOrdersCount, onChange }: CustomerTabLayoutProps) {
  return (
    <Card>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2}>
          <Stack spacing={1.25}>
            <Typography variant="overline" color="primary.light">
              Customer area
            </Typography>
            <Typography
              variant="h3"
              maxWidth="16ch"
              sx={{ fontSize: { xs: '1.9rem', sm: '2.2rem', md: undefined } }}
            >
              Build an order, review it live, and track it by code.
            </Typography>
            <Typography color="text.secondary" maxWidth="68ch">
              Select pizzas from the live backend menu, set the quantity for each item,
              create the order, and follow every order from this browser session.
            </Typography>
          </Stack>

          <Tabs value={activeTab} onChange={(_event, value: CustomerTab) => onChange(value)} variant="fullWidth">
            <Tab label="New order" value="new-order" />
            <Tab label={`My orders${trackedOrdersCount > 0 ? ` (${trackedOrdersCount})` : ''}`} value="my-orders" />
          </Tabs>
        </Stack>
      </CardContent>
    </Card>
  )
}
