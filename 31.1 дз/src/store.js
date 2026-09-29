import { configureStore, createSlice } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all, delay, put, takeEvery } from 'redux-saga/effects'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
  },
  reducers: {
    addTodoRequest: () => {},
    addTodoSuccess: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      })
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(
        (todo) => todo.id !== action.payload
      )
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(
        (todo) => todo.id === action.payload
      )

      if (todo) {
        todo.completed = !todo.completed
      }
    },
    editTodo: (state, action) => {
      const todo = state.items.find(
        (todo) => todo.id === action.payload.id
      )

      if (todo) {
        todo.text = action.payload.text
      }
    },
    clearTodos: (state) => {
      state.items = []
    },
  },
})

export const {
  addTodoRequest,
  addTodoSuccess,
  deleteTodo,
  toggleTodo,
  editTodo,
  clearTodos,
} = todoSlice.actions

function* addTodoSaga(action) {
  yield delay(300)
  yield put(addTodoSuccess(action.payload))
}

function* watchTodos() {
  yield takeEvery(addTodoRequest.type, addTodoSaga)
}

function* rootSaga() {
  yield all([
    watchTodos(),
  ])
}

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store