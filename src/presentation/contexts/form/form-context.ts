import { createContext } from 'react'

export type FormContextState = {
  state: {
    isLoading: boolean
  }
  errorState: {
    email: string
    password: string
    main: string
  }
}

export default createContext<FormContextState>(null)
