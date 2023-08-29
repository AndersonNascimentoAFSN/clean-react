import React from 'react'

import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { RenderResult } from '@testing-library/react'

import { Login } from './login'
import { ValidationSpy } from '@/presentation/mock'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}



const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

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
    it('should call validation with correct email', async () => {
      const { sut, validationSpy } = makeSut()
      const emailInput = sut.getByRole('textbox', { name: /email/i })
      await userEvent.type(emailInput, 'any_email')
      expect(validationSpy.fieldName).toBe('email')
      expect(validationSpy.fieldValue).toBe('any_email')
    })

    it('should call validation with correct password', async () => {
      const { sut, validationSpy } = makeSut()
      const passwordInput = sut.getByRole('textbox', { name: /password/i })

      await userEvent.type(passwordInput, 'any_password')

      expect(validationSpy.fieldName).toBe('password')
      expect(validationSpy.fieldValue).toBe('any_password')
    })
  })
})
