import React from 'react'

import { render } from '@testing-library/react'

import { Login } from './login'

describe('Login Component', () => {
  it('should not render spinner and error message on start', () => {
    const { getByTestId, queryByTestId } = render(<Login />)
    // const errorWrap = getByTestId('form-status')
    // expect(errorWrap.childElementCount).toBe(0)

    const spinner = queryByTestId('spinner')
    const errorMessage = queryByTestId('error-message')

    expect(spinner).not.toBeInTheDocument()
    expect(errorMessage).not.toBeInTheDocument()
  })
})