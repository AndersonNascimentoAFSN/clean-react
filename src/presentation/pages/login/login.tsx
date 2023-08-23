import React from 'react'

import { Logo } from '@/presentation/components/logo'

import styles from './login-styles.scss'
import { Spinner } from '@/presentation/components/spinner/spinner'

export const Login: React.FC = () => {
  return (
    <div className={styles['login']}>
      <header className={styles['header']}>
        <Logo />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>

      <form className={styles['form']}>
        <h2>Login</h2>

        <div className={styles['input-wrap']}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={styles['status']}>circle red</span>
        </div>

        <div className={styles['input-wrap']}>
          <input type="password" name="password" placeholder="Digite sua senha" />
          <span className={styles['status']}>circle red</span>
        </div>

        <button className={styles['submit']} type="submit">Entrar</button>
        <span className={styles['link']}>Criar conta</span>

        <div className={styles['error-wrap']}>
          <Spinner className={styles['spinner']} />
          <span className={styles['error']}>Erro</span>
        </div>
      </form>

      <footer />
    </div>
  )
}