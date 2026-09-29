import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, test, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import App from './App'

afterEach(() => {
  cleanup()
})

describe('TODO tests', () => {
  test('на сторінці є заголовок TODO', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'TODO' })
    ).toBeInTheDocument()
  })

  test('у поле можна вводити букви та цифри', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введіть завдання')

    await user.type(input, 'Завдання123')

    expect(input).toHaveValue('Завдання123')
  })

  test('при порожньому полі показується помилка', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(
      screen.getByRole('button', { name: 'Додати' })
    )

    expect(
      screen.getByText('Введіть завдання')
    ).toBeInTheDocument()
  })

  test('нове завдання додається до списку', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введіть завдання')

    await user.type(input, 'Вивчити React')

    await user.click(
      screen.getByRole('button', { name: 'Додати' })
    )

    expect(
      screen.getByText('Вивчити React')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Всього: 1')
    ).toBeInTheDocument()
  })

  test('завдання можна видалити', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введіть завдання')

    await user.type(input, 'Видалити мене')

    await user.click(
      screen.getByRole('button', { name: 'Додати' })
    )

    expect(
      screen.getByText('Видалити мене')
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Видалити' })
    )

    expect(
      screen.queryByText('Видалити мене')
    ).not.toBeInTheDocument()
  })
})