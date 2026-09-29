import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSwapiData = createAsyncThunk(
  'swapi/fetchData',
  async (endpoint) => {
    const response = await fetch(`https://swapi.py4e.com/api/${endpoint}`)

    if (!response.ok) {
      throw new Error('Помилка завантаження даних')
    }

    return response.json()
  },
)

const swapiSlice = createSlice({
  name: 'swapi',

  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearData: (state) => {
      state.data = null
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSwapiData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSwapiData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchSwapiData.rejected, (state) => {
        state.loading = false
        state.error = 'Не вдалося отримати дані'
      })
  },
})

export const { clearData } = swapiSlice.actions

const store = configureStore({
  reducer: {
    swapi: swapiSlice.reducer,
  },
})

export default store