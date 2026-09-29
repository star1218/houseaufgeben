import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error, info) {
    console.error('Помилка:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Щось пішло не так.</h1>
          <p>Спробуйте перезавантажити сторінку.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary