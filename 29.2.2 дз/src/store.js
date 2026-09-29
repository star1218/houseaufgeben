import { configureStore, createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload)
    },
  },
})

export const { addTodo } = todoSlice.actions

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
})

export default store