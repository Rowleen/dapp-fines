import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Button from '../Button'

describe('Button component', () => {
  it('renders button unchanged', () => {
    const { container } = render(
      <Button type='button' text='button' shape='button' />
    )
    expect(container).toMatchSnapshot()
  })

  it('fire onClick when user clicks', () => {
    const onClick = jest.fn()
    const { getByRole } = render(
      <Button type='button' text='button' shape='button' onClick={onClick} />
    )

    const button = getByRole('button', { name: 'button' })

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
