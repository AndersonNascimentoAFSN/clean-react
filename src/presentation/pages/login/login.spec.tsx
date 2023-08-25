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
    // it('should starts with a submit button disabled', () => {
    //   const { getByRole } = render(<Login />)

    //   const emailInput = getByRole('textbox', { name: /email/i })
    //   const passwordInput = getByRole('textbox', { name: /password/i })

    //   expect(emailInput).toBeInTheDocument()
    //   expect(passwordInput).toBeInTheDocument()
    // })
    it('should starts input error span with title and content initial', () => {
      const { getByTestId } = render(<Login />)

      const emailStatus = getByTestId('email-status')
      const passwordStatus = getByTestId('password-status')

      expect(emailStatus.title).toBe('Campo obrigatório')
      expect(passwordStatus.title).toBe('Campo obrigatório')
      expect(emailStatus).toHaveTextContent('🔴')
      expect(passwordStatus).toHaveTextContent('🔴')
    })
  })
})