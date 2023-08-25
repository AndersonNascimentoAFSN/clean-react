// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext } from 'react'

type State = {
  isLoading: boolean
}

type ErrorState = {
  email: string
  password: string
  main: string
}

export type FormContextState = {
  state: State
  errorState: ErrorState
  actions: {
    setState: React.Dispatch<React.SetStateAction<State>>
    setErrorState: React.Dispatch<React.SetStateAction<ErrorState>>
  }
}

export default createContext<FormContextState>(null)
