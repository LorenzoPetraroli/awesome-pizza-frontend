import LocalPizzaRoundedIcon from '@mui/icons-material/LocalPizzaRounded'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import SoupKitchenRoundedIcon from '@mui/icons-material/SoupKitchenRounded'
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'

type AppShellProps = {
  children: React.ReactNode
}

const navItems = [
  { label: 'Home', to: '/', icon: <MenuBookRoundedIcon fontSize="small" /> },
  { label: 'Customer', to: '/customer', icon: <LocalPizzaRoundedIcon fontSize="small" /> },
  { label: 'Kitchen', to: '/kitchen', icon: <SoupKitchenRoundedIcon fontSize="small" /> },
]

export function AppShell({ children }: AppShellProps) {
  const location = useLocation()

  return (
    <Box className="app-shell">
      <AppBar position="sticky">
        <Toolbar className="topbar">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box className="brand-mark">
              <LocalPizzaRoundedIcon />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Awesome Pizza
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order management portal
              </Typography>
            </Box>
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.25} alignItems={{ xs: 'stretch', md: 'center' }}>
            <Stack direction="row" spacing={1} className="nav-links">
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  component={NavLink}
                  to={item.to}
                  color="inherit"
                  startIcon={item.icon}
                  className={location.pathname === item.to ? 'nav-button nav-button-active' : 'nav-button'}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="page-content">
        {children}
      </Container>
    </Box>
  )
}
