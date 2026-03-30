import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { formatPrice, toPriceNumber } from '../../lib/format.ts'
import type { PizzaTypeResponse } from '../../types/api.ts'

type CustomerMenuSectionProps = {
  pizzas: PizzaTypeResponse[]
  isLoading: boolean
  error: string | null
  quantities: Record<string, number>
  onQuantityChange: (pizzaType: string, quantity: number) => void
}

export function CustomerMenuSection({
  pizzas,
  isLoading,
  error,
  quantities,
  onQuantityChange,
}: CustomerMenuSectionProps) {
  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h5">Menu</Typography>
            <Typography variant="body2" color="text.secondary">
              Browse the live pizza menu and set the quantity for each item.
            </Typography>
          </Stack>

          {error ? <Alert severity="error">{error}</Alert> : null}

          {isLoading ? (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <CircularProgress size={24} />
              <Typography color="text.secondary">Loading pizzas from the API...</Typography>
            </Stack>
          ) : (
            <Stack spacing={2}>
              {pizzas.map((pizza) => {
                const quantity = quantities[pizza.type] ?? 0
                const lineTotal = toPriceNumber(pizza.unitPrice) * quantity
                const isSelected = quantity > 0

                return (
                  <Card
                    key={pizza.type}
                    variant="outlined"
                    sx={{
                      borderLeftWidth: 4,
                      borderLeftStyle: 'solid',
                      borderLeftColor: isSelected ? 'primary.main' : 'divider',
                    }}
                  >
                    <CardContent sx={{ p: 2.25 }}>
                      <Stack spacing={2}>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={1.5}
                          justifyContent="space-between"
                          alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
                        >
                          <Box>
                            <Typography variant="h6">{pizza.name}</Typography>
                            <Typography color="text.secondary">
                              {pizza.ingredientsDescription}
                            </Typography>
                          </Box>
                          <Chip label={formatPrice(pizza.unitPrice)} variant="outlined" />
                        </Stack>

                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={1.5}
                          justifyContent="space-between"
                          alignItems={{ xs: 'stretch', sm: 'center' }}
                        >
                          <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton
                              aria-label={`Decrease ${pizza.name} quantity`}
                              onClick={() => onQuantityChange(pizza.type, quantity - 1)}
                              disabled={quantity === 0}
                            >
                              <RemoveRoundedIcon />
                            </IconButton>
                            <TextField
                              type="number"
                              size="small"
                              label="Qty"
                              value={quantity}
                              onChange={(event) => {
                                const nextValue = Number(event.target.value)
                                onQuantityChange(pizza.type, Number.isNaN(nextValue) ? 0 : nextValue)
                              }}
                              slotProps={{
                                htmlInput: {
                                  min: 0,
                                },
                              }}
                              sx={{ width: 96 }}
                            />
                            <IconButton
                              aria-label={`Increase ${pizza.name} quantity`}
                              onClick={() => onQuantityChange(pizza.type, quantity + 1)}
                            >
                              <AddRoundedIcon />
                            </IconButton>
                          </Stack>

                          <Typography color="text.secondary">
                            Line total: {formatPrice(lineTotal)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                )
              })}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
