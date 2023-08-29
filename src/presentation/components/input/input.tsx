import React, { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'

import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  // const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
  //   event.target.readOnly = false
  // }

  const { errorState, state, actions: { setState } } = useContext(FormContext)

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getStatus = (): string => {
    return errorState[props.name] ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return errorState[props.name] || 'Tudo certo!'
  }

  const status = getStatus()
  const title = getTitle()

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        autoComplete='off' /* readOnly onFocus={enableInput} */
        className={Styles.input}
        onChange={handleChange}
      />
      <span
        title={title}
        className={Styles.status}
        data-testid={`${props.name}-status`}
      >
        {status}
      </span>
    </div>
  )
}

export default Input
