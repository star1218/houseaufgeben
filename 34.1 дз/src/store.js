import { configureStore, createSlice } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

const bookingSlice = createSlice({
  name: 'booking',

  initialState: {
    destinations: [],
    hotels: [],
    loading: false,
    error: null,
  },

  reducers: {
    loadDestinationsRequest: (state) => {
      state.loading = true
      state.error = null
    },

    loadDestinationsSuccess: (state, action) => {
      state.loading = false
      state.destinations = action.payload
    },

    loadDestinationsFailure: (state) => {
      state.loading = false
      state.error = 'Не вдалося завантажити напрямки'
    },

    searchHotelsRequest: (state) => {
      state.loading = true
      state.error = null
    },

    searchHotelsSuccess: (state, action) => {
      state.loading = false
      state.hotels = action.payload
    },

    searchHotelsFailure: (state) => {
      state.loading = false
      state.error = 'Не вдалося знайти готелі'
    },
  },
})

export const {
  loadDestinationsRequest,
  loadDestinationsSuccess,
  loadDestinationsFailure,
  searchHotelsRequest,
  searchHotelsSuccess,
  searchHotelsFailure,
} = bookingSlice.actions

function* loadDestinationsSaga() {
  try {
    const response = yield call(
      axios.get,
      'http://localhost:3001/destinations'
    )

    yield put(loadDestinationsSuccess(response.data))
  } catch {
    yield put(loadDestinationsFailure())
  }
}

function* searchHotelsSaga(action) {
  try {
    yield call(
      axios.post,
      'http://localhost:3001/bookings',
      action.payload
    )

    const response = yield call(
      axios.get,
      'http://localhost:3001/hotels',
      {
        params: {
          destination: action.payload.destination,
        },
      }
    )

    yield put(searchHotelsSuccess(response.data))
  } catch {
    yield put(searchHotelsFailure())
  }
}

function* rootSaga() {
  yield takeLatest(
    loadDestinationsRequest.type,
    loadDestinationsSaga
  )

  yield takeLatest(
    searchHotelsRequest.type,
    searchHotelsSaga
  )
}

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    booking: bookingSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store