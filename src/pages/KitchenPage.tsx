import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import SoupKitchenRoundedIcon from '@mui/icons-material/SoupKitchenRounded'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell.tsx'

export function KitchenPage() {
  return (
    <AppShell>
      <Stack spacing={3}>
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

        <Card>
          <CardContent className="placeholder-card">
            <Box className="feature-icon">
              <SoupKitchenRoundedIcon fontSize="large" />
            </Box>
            <Typography variant="h3" gutterBottom>
              Kitchen page
            </Typography>
            <Typography color="text.secondary">
              This is the operational area for the pizzaiolo. We will add the
              queue summary, current order in progress, ready orders, and action
              buttons for start, ready, and complete.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </AppShell>
  )
}
