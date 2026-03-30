import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import LocalPizzaRoundedIcon from '@mui/icons-material/LocalPizzaRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import SoupKitchenRoundedIcon from '@mui/icons-material/SoupKitchenRounded'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

type AppShellProps = {
  children: React.ReactNode
}

const navItems = [
  { label: 'Home', to: '/', icon: <MenuBookRoundedIcon fontSize="small" /> },
  { label: 'Customer', to: '/customer', icon: <ReceiptLongRoundedIcon fontSize="small" /> },
  { label: 'Kitchen', to: '/kitchen', icon: <SoupKitchenRoundedIcon fontSize="small" /> },
]

export function AppShell({ children }: AppShellProps) {
  const location = useLocation()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <Box className="app-shell">
      <AppBar position="sticky">
        <Toolbar
          className="topbar"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr auto', md: 'auto minmax(0, 1fr)' },
            alignItems: 'center',
            columnGap: 3,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" className="topbar-nav-mobile">
            <IconButton
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open navigation menu"
              className="brand-mark brand-mark-button"
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
              }}
            >
              <LocalPizzaRoundedIcon />
            </IconButton>

            <Stack direction="row" spacing={1} className="nav-links" sx={{ display: { xs: 'none', md: 'flex' } }}>
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

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            className="topbar-brand"
            sx={{ justifyContent: 'flex-end' }}
          >
            <Box
              sx={{
                display: 'grid',
                gap: 0.15,
                minWidth: 0,
                justifyItems: 'end',
                textAlign: 'right',
              }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                Awesome Pizza
              </Typography>
              <Typography variant="body2" color="text.secondary" className="brand-subtitle">
                Order management portal
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              p: 1,
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Navigation</Typography>
          <Typography variant="body2" color="text.secondary">
            Move between home, customer, and kitchen.
          </Typography>
        </Box>

        <List sx={{ pt: 0.5 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              selected={location.pathname === item.to}
              onClick={() => setIsMobileNavOpen(false)}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Container maxWidth="lg" className="page-content">
        {children}
      </Container>
    </Box>
  )
}
