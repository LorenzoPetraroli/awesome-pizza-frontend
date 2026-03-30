import { alpha, createTheme } from '@mui/material/styles'

const tomatoRed = '#DC2626'
const emberRed = '#991B1B'
const ovenStone = '#1C1917'
const ovenStoneHover = '#292524'
const canvasDark = '#0C0A09'
const flourWhite = '#FAFAF9'
const mutedStone = '#A8A29E'
const cheeseAmber = '#F59E0B'
const basilGreen = '#22C55E'
const ovenBlue = '#3B82F6'

export const appTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: tomatoRed,
      light: '#EF4444',
      dark: emberRed,
      contrastText: flourWhite,
    },
    secondary: {
      main: cheeseAmber,
      light: '#FBBF24',
      dark: '#D97706',
      contrastText: '#1C1917',
    },
    success: {
      main: basilGreen,
      contrastText: flourWhite,
    },
    info: {
      main: ovenBlue,
      contrastText: flourWhite,
    },
    warning: {
      main: cheeseAmber,
      contrastText: '#1C1917',
    },
    background: {
      default: canvasDark,
      paper: ovenStone,
    },
    text: {
      primary: flourWhite,
      secondary: mutedStone,
    },
    divider: '#44403C',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 700,
      letterSpacing: '-0.04em',
      lineHeight: 1.05,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
    overline: {
      fontWeight: 700,
      letterSpacing: '0.14em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: canvasDark,
          backgroundImage: `
            radial-gradient(circle at top right, ${alpha(tomatoRed, 0.16)}, transparent 30%),
            radial-gradient(circle at bottom left, ${alpha(cheeseAmber, 0.12)}, transparent 25%)
          `,
        },
        '::selection': {
          backgroundColor: alpha(tomatoRed, 0.32),
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #44403C',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha(ovenStone, 0.94),
          border: '1px solid #44403C',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.28)',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
        },
        containedPrimary: {
          boxShadow: `0 16px 36px ${alpha(tomatoRed, 0.28)}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(ovenStone, 0.82),
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid #44403C',
          boxShadow: 'none',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          '&:hover': {
            backgroundColor: alpha(ovenStoneHover, 0.82),
          },
        },
      },
    },
  },
})
