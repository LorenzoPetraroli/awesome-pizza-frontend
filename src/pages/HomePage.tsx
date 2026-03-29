import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import SoupKitchenRoundedIcon from '@mui/icons-material/SoupKitchenRounded'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell.tsx'

const entryCards = [
  {
    title: 'Customer area',
    description:
      'Browse the menu, create a new order, receive the order code, and track every status update from this browser.',
    to: '/customer',
    cta: 'Start an order',
    icon: <ReceiptLongRoundedIcon fontSize="large" />,
  },
  {
    title: 'Kitchen area',
    description:
      'Monitor the queue, take one order at a time, mark it ready, and complete the workflow manually.',
    to: '/kitchen',
    cta: 'Open kitchen dashboard',
    icon: <SoupKitchenRoundedIcon fontSize="large" />,
  },
]

export function HomePage() {
  return (
    <AppShell>
      <Stack spacing={4} sx={{ pt: { xs: 2, md: 3 } }}>
        <Card className="hero-card">
          <CardContent className="hero-layout hero-layout-simple">
            <Box className="hero-copy">
              <Typography variant="overline" color="primary.light">
                Portal overview
              </Typography>
              <Typography
                variant="h3"
                className="hero-title hero-title-balanced"
                sx={{ fontSize: { xs: '1.95rem', sm: '2.3rem', md: undefined } }}
              >
                Choose the customer flow or jump straight into the kitchen queue.
              </Typography>
              <Typography color="text.secondary" className="hero-text">
                Use the customer area to create and track orders from this browser,
                or open the kitchen area to manage the live operational queue.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {entryCards.map((item) => (
            <Grid key={item.title} size={{ xs: 12, md: 6 }}>
              <Card className="feature-card">
                <CardContent>
                  <Box className="feature-icon">{item.icon}</Box>
                  <Typography variant="h5" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary" className="feature-text">
                    {item.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={item.to}
                    variant="text"
                    color="secondary"
                    endIcon={<ArrowForwardRoundedIcon />}
                    className="inline-action"
                  >
                    {item.cta}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </AppShell>
  )
}
