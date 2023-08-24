import React from 'react'

import { getByRole, render } from '@testing-library/react'

import { Login } from './login'

describe('Login Component', () => {
  describe('should start with initial state', () => {
    it('should not render spinner and error message on start', () => {
      const { getByTestId, queryByTestId } = render(<Login />)
      // const errorWrap = getByTestId('form-status')
      // expect(errorWrap.childElementCount).toBe(0)

      const spinner = queryByTestId('spinner')
      const errorMessage = queryByTestId('error-message')

      expect(spinner).not.toBeInTheDocument()
      expect(errorMessage).not.toBeInTheDocument()
    })
    it('should starts with a submit button disabled', () => {
      const { getByRole } = render(<Login />)

      const submitButton = getByRole('button', { name: /entrar/i })
      expect(submitButton).toHaveAttribute('disabled')
    })
  })
})