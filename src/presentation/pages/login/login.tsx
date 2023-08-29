import React, { useState, useEffect } from 'react'

import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols'

import Styles from './login-styles.scss'

type Props = {
  validation: Validation
}

export const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
  })

  const [errorState, setErrorState] = useState({
    email: '',
    password: '',
    main: '',
  })

  useEffect(() => {
    setErrorState((prevState) => ({
      ...prevState,
      email: validation.validate(
        'email',
        state.email,
      )
    }))
  }, [state.email])

  useEffect(() => {
    setErrorState((prevState) => ({
      ...prevState,
      password: validation.validate(
        'password',
        state.password
      )
    }))
  }, [state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={{ state, errorState, actions: { setState, setErrorState } }}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" aria-label='email' />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            aria-label='password'
            role="textbox"
          />

          <button
            className={Styles.submit}
            type="submit"
            disabled={!!errorState.email || !!errorState.password}
          >
            Entrar
          </button>

          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
