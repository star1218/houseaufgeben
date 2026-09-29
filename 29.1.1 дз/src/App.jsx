import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from './store'
import './App.css'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="counter">
      <h1>Counter</h1>

      <div className="count">{count}</div>

      <div className="buttons">
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
    </div>
  )
}

export default App