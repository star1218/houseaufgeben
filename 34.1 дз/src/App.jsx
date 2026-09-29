import { useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Stack,
  Chip,
} from '@mui/material'
import {
  loadDestinationsRequest,
  searchHotelsRequest,
} from './store'

function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#172554' }}>
      <Toolbar>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, fontWeight: 800 }}
        >
          TravelNest
        </Typography>

        <Button color="inherit" component={NavLink} to="/">
          Main
        </Button>

        <Button color="inherit" component={NavLink} to="/about">
          About
        </Button>

        <Button color="inherit" component={NavLink} to="/hotels">
          Hotels
        </Button>
      </Toolbar>
    </AppBar>
  )
}

function Main() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { destinations, loading, error } = useSelector(
    (state) => state.booking
  )

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    dispatch(loadDestinationsRequest())
  }, [dispatch])

  const submitBooking = (values) => {
    dispatch(searchHotelsRequest(values))
    navigate('/hotels')
  }

  return (
    <>
      <Box
        sx={{
          background:
            'linear-gradient(135deg, #172554 0%, #2563eb 55%, #38bdf8 100%)',
          color: 'white',
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Chip
            label="YOUR NEXT JOURNEY"
            sx={{
              mb: 2,
              bgcolor: 'rgba(255,255,255,0.15)',
              color: 'white',
            }}
          />

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ maxWidth: 700 }}
          >
            Find a place worth remembering.
          </Typography>

          <Typography
            variant="h6"
            sx={{ mt: 2, maxWidth: 650, opacity: 0.9 }}
          >
            Discover hand-picked city stays and plan your next
            European adventure with TravelNest.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Card
          sx={{
            mt: -5,
            mb: 8,
            position: 'relative',
            borderRadius: 4,
            boxShadow: 8,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Plan your stay
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Choose a destination and travel dates.
            </Typography>

            <Form
              onSubmit={submitBooking}
              initialValues={{
                destination: '',
                checkIn: '',
                checkOut: '',
              }}
              validate={(values) => {
                const errors = {}

                if (!values.destination) {
                  errors.destination = 'Choose a destination'
                }

                if (!values.checkIn) {
                  errors.checkIn = 'Choose check-in date'
                }

                if (!values.checkOut) {
                  errors.checkOut = 'Choose check-out date'
                }

                if (
                  values.checkIn &&
                  values.checkOut &&
                  values.checkOut <= values.checkIn
                ) {
                  errors.checkOut =
                    'Check-out must be after check-in'
                }

                return errors
              }}
              render={({ handleSubmit, values }) => (
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Field name="destination">
                      {({ input, meta }) => (
                        <TextField
                          {...input}
                          select
                          fullWidth
                          label="Destination"
                          error={
                            meta.touched && Boolean(meta.error)
                          }
                          helperText={
                            meta.touched ? meta.error : ''
                          }
                        >
                          {destinations.map((item) => (
                            <MenuItem
                              key={item.id}
                              value={item.city}
                            >
                              {item.city}, {item.country}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>

                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={2}
                    >
                      <Field name="checkIn">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            fullWidth
                            type="date"
                            label="Check-in"
                            slotProps={{
                              inputLabel: {
                                shrink: true,
                              },
                              htmlInput: {
                                min: today,
                                max: '2099-12-31',
                              },
                            }}
                            error={
                              meta.touched &&
                              Boolean(meta.error)
                            }
                            helperText={
                              meta.touched ? meta.error : ''
                            }
                          />
                        )}
                      </Field>

                      <Field name="checkOut">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            fullWidth
                            type="date"
                            label="Check-out"
                            slotProps={{
                              inputLabel: {
                                shrink: true,
                              },
                              htmlInput: {
                                min: values.checkIn || today,
                                max: '2099-12-31',
                              },
                            }}
                            error={
                              meta.touched &&
                              Boolean(meta.error)
                            }
                            helperText={
                              meta.touched ? meta.error : ''
                            }
                          />
                        )}
                      </Field>
                    </Stack>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        bgcolor: '#172554',
                      }}
                    >
                      {loading
                        ? 'Searching...'
                        : 'Explore hotels'}
                    </Button>

                    {error && (
                      <Typography color="error">
                        {error}
                      </Typography>
                    )}
                  </Stack>
                </Box>
              )}
            />
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

function Hotels() {
  const { hotels, loading, error } = useSelector(
    (state) => state.booking
  )

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 7 }}>
        <Typography variant="h3" fontWeight="bold">
          Your hotel matches
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1, mb: 5 }}
        >
          Places selected for your destination.
        </Typography>

        {loading && (
          <Typography variant="h6">
            Finding the best places...
          </Typography>
        )}

        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}

        {!loading && hotels.length === 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6">
                Start your search from the Main page.
              </Typography>

              <Typography color="text.secondary">
                Your matching hotels will appear here.
              </Typography>
            </CardContent>
          </Card>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 3,
          }}
        >
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              sx={{
                borderRadius: 4,
                transition: '0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 7,
                },
              }}
            >
              <Box
                sx={{
                  height: 130,
                  background:
                    'linear-gradient(135deg, #172554, #38bdf8)',
                }}
              />

              <CardContent>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                >
                  {hotel.name}
                </Typography>

                <Typography
                  color="primary"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {hotel.destination}
                </Typography>

                <Typography sx={{ my: 2 }}>
                  {hotel.description}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Chip label={`★ ${hotel.rating}`} />

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    €{hotel.price}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

function About() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
        >
          About TravelNest
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          TravelNest is a travel booking application created
          with React. It helps travellers choose a destination,
          select travel dates and discover matching hotels.
        </Typography>

        <Box
          sx={{
            mt: 5,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h4">
                6
              </Typography>
              <Typography color="text.secondary">
                Destinations
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h4">
                6
              </Typography>
              <Typography color="text.secondary">
                Hotels
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h4">
                24/7
              </Typography>
              <Typography color="text.secondary">
                Search
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  )
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        bgcolor: '#0f172a',
        color: 'white',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" fontWeight="bold">
          TravelNest
        </Typography>

        <Typography sx={{ opacity: 0.7 }}>
          Explore more. Stay somewhere memorable.
        </Typography>

        <Typography sx={{ mt: 2, opacity: 0.5 }}>
          © 2026 TravelNest
        </Typography>
      </Container>
    </Box>
  )
}

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f8fafc',
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotels" element={<Hotels />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  )
}

export default App