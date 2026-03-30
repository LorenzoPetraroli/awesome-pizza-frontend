import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded'
import { Box, Button, Card, CardContent, Drawer, Grid, Stack } from '@mui/material'
import type { ReactNode } from 'react'

type NewOrderTabContentProps = {
  isStickySummary: boolean
  isCompactMobile: boolean
  hasSelectedItems: boolean
  selectedItemCount: number
  estimatedTotalLabel: string
  isMobileSummaryOpen: boolean
  onOpenMobileSummary: () => void
  onCloseMobileSummary: () => void
  menuContent: ReactNode
  summaryContent: ReactNode
}

export function NewOrderTabContent({
  isStickySummary,
  isCompactMobile,
  hasSelectedItems,
  selectedItemCount,
  estimatedTotalLabel,
  isMobileSummaryOpen,
  onOpenMobileSummary,
  onCloseMobileSummary,
  menuContent,
  summaryContent,
}: NewOrderTabContentProps) {
  return (
    <>
      <Grid container spacing={3} alignItems="flex-start">
        <Grid size={{ xs: 12, lg: 7.5 }}>{menuContent}</Grid>

        {isStickySummary ? (
          <Grid size={{ xs: 12, lg: 4.5 }}>
            <Stack spacing={3} sx={{ position: 'sticky', top: 104 }}>
              <Card>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>{summaryContent}</CardContent>
              </Card>
            </Stack>
          </Grid>
        ) : !isCompactMobile ? (
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>{summaryContent}</CardContent>
            </Card>
          </Grid>
        ) : null}
      </Grid>

      {isCompactMobile && hasSelectedItems ? (
        <Box
          sx={{
            position: 'fixed',
            left: 16,
            right: 16,
            bottom: 16,
            zIndex: (currentTheme) => currentTheme.zIndex.drawer - 1,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<ShoppingBagRoundedIcon />}
            onClick={onOpenMobileSummary}
            sx={{ py: 1.5, justifyContent: 'space-between' }}
          >
            <span>{selectedItemCount} items</span>
            <span>{estimatedTotalLabel}</span>
          </Button>
        </Box>
      ) : null}

      <Drawer
        anchor="bottom"
        open={isCompactMobile && isMobileSummaryOpen}
        onClose={onCloseMobileSummary}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              p: 2,
            },
          },
        }}
      >
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>{summaryContent}</CardContent>
      </Drawer>
    </>
  )
}
