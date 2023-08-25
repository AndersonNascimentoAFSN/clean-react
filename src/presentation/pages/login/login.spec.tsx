import React from 'react'

import { render,  } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'

import { Login } from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login Component', () => {
  describe('initial state', () => {
    it('should not render spinner and error message on start', () => {
      const { sut } = makeSut()
      // const errorWrap = getByTestId('form-status')
      // expect(errorWrap.childElementCount).toBe(0)

      const spinner = sut.queryByTestId('spinner')
      const errorMessage = sut.queryByTestId('error-message')

      expect(spinner).not.toBeInTheDocument()
      expect(errorMessage).not.toBeInTheDocument()
    })
    it('should starts with a submit button disabled', () => {
      const { sut } = makeSut()

      const submitButton = sut.getByRole('button', { name: /entrar/i })
      expect(submitButton).toHaveAttribute('disabled')
    })
    it('should starts input error span with title and content initial', () => {
      const { sut } = makeSut()

      const emailStatus = sut.getByTestId('email-status')
      const passwordStatus = sut.getByTestId('password-status')

      expect(emailStatus.title).toBe('Campo obrigatório')
      expect(passwordStatus.title).toBe('Campo obrigatório')
      expect(emailStatus).toHaveTextContent('🔴')
      expect(passwordStatus).toHaveTextContent('🔴')
    })
  })
  describe('validation', () => {
    it('should call validation with correct value', () => {
      const { sut } = makeSut()
      const emailInput = sut.getByRole('textbox', { name: /email/i })
      // const passwordInput = sut.getByRole('textbox', { name: /password/i })
      

    })
  })
})

// it('should starts with a submit button disabled', () => {
//   const { getByRole } = render(<Login />)

//   const emailInput = getByRole('textbox', { name: /email/i })
//   const passwordInput = getByRole('textbox', { name: /password/i })

//   expect(emailInput).toBeInTheDocument()
//   expect(passwordInput).toBeInTheDocument()
// })