import React, { useState } from 'react'

import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'

import { FormContext } from '@/presentation/contexts'

import Styles from './login-styles.scss'

export const Login: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
  })

  const [errorState, setErrorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: '',
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={{state, errorState}}>
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

          <button className={Styles.submit} type="submit" disabled>Entrar</button>

          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
