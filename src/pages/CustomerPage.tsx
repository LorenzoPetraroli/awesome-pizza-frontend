import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import LocalPizzaRoundedIcon from '@mui/icons-material/LocalPizzaRounded'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell.tsx'

export function CustomerPage() {
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
              <LocalPizzaRoundedIcon fontSize="large" />
            </Box>
            <Typography variant="h3" gutterBottom>
              Customer page
            </Typography>
            <Typography color="text.secondary">
              This is the next area we will build. It will contain the live pizza
              menu, order creation flow, confirmation with order code, and order
              tracking with polling.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </AppShell>
  )
}
