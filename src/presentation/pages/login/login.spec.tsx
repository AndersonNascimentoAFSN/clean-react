import React from 'react'
import { faker } from '@faker-js/faker'

import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { RenderResult } from '@testing-library/react'

import { Login } from './login'
import { ValidationSpy } from '@/presentation/mock'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

type SutParams = {
  validationError: string
}



const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError

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
      const validationError = faker.internet.displayName()

      const { sut } = makeSut({ validationError })

      const submitButton = sut.getByRole('button', { name: /entrar/i })
      expect(submitButton).toHaveAttribute('disabled')
    })
    it('should starts input error span with title and content initial', () => {
      const validationError = faker.internet.displayName()

      const { sut } = makeSut({ validationError })

      const emailStatus = sut.getByTestId('email-status')
      const passwordStatus = sut.getByTestId('password-status')

      expect(emailStatus.title).toBe(validationError)
      expect(passwordStatus.title).toBe(validationError)
      expect(emailStatus).toHaveTextContent('🔴')
      expect(passwordStatus).toHaveTextContent('🔴')
    })
  })
  describe('validation', () => {
    it('should call validation with correct email', async () => {
      const { sut, validationSpy } = makeSut()

      const email = faker.internet.email()

      const emailInput = sut.getByRole('textbox', { name: /email/i })
      await userEvent.type(emailInput, email)
      expect(validationSpy.fieldName).toBe('email')
      expect(validationSpy.fieldValue).toBe(email)
    })

    it('should call validation with correct password', async () => {
      const { sut, validationSpy } = makeSut()
      const password = faker.internet.password()

      const passwordInput = sut.getByRole('textbox', { name: /password/i })

      await userEvent.type(passwordInput, password)

      expect(validationSpy.fieldName).toBe('password')
      expect(validationSpy.fieldValue).toBe(password)
    })

    it('should show email error if validation fails', async () => {
      const validationError = faker.internet.displayName()

      const { sut } = makeSut({ validationError })

      const emailInput = sut.getByRole('textbox', { name: /email/i })
      await userEvent.type(emailInput, faker.internet.email())

      const emailStatus = sut.getByTestId('email-status')

      expect(emailStatus.title).toBe(validationError)
      expect(emailStatus).toHaveTextContent('🔴')
    })

    it('should show password error if validation fails', async () => {
      const validationError = faker.internet.displayName()

      const { sut } = makeSut({ validationError })

      const passwordInput = sut.getByRole('textbox', { name: /password/i })
      await userEvent.type(passwordInput, faker.internet.password())

      const passwordStatus = sut.getByTestId('password-status')

      expect(passwordStatus.title).toBe(validationError)
      expect(passwordStatus).toHaveTextContent('🔴')
    })

    it('should show valid email state if validation succeeds', async () => {
      const { sut } = makeSut()

      const emailInput = sut.getByRole('textbox', { name: /email/i })
      await userEvent.type(emailInput, faker.internet.email())

      const emailStatus = sut.getByTestId('email-status')

      expect(emailStatus.title).toBe('Tudo certo!')
      expect(emailStatus).toHaveTextContent('🟢')
    })

    it('should show valid password state if validation succeeds', async () => {
      const { sut } = makeSut()

      const passwordInput = sut.getByRole('textbox', { name: /password/i })
      await userEvent.type(passwordInput, faker.internet.password())

      const passwordStatus = sut.getByTestId('password-status')

      expect(passwordStatus.title).toBe('Tudo certo!')
      expect(passwordStatus).toHaveTextContent('🟢')
    })

    it('should enable submit button if form is valid', async () => {
      const { sut } = makeSut()

      const emailInput = sut.getByRole('textbox', { name: /email/i })
      const passwordInput = sut.getByRole('textbox', { name: /password/i })

      await userEvent.type(emailInput, faker.internet.email())
      await userEvent.type(passwordInput, faker.internet.password())

      const submitButton = sut.getByRole('button', { name: /entrar/i })
      expect(submitButton).not.toHaveAttribute('disabled')
    })
  })
})
