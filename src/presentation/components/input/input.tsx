import React, { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'

import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  // const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
  //   event.target.readOnly = false
  // }
  const { errorState } = useContext(FormContext)

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return errorState[props.name]
  }

  const status = getStatus()
  const title = getTitle()

  return (
    <div className={Styles.inputWrap}>
      <input autoComplete='off' /* readOnly onFocus={enableInput} */ {...props} className={Styles.input} />
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
