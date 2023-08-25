import React, { useContext } from 'react'
import Spinner from '../spinner/spinner'
import { FormContext } from '@/presentation/contexts'
import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { state: { isLoading }, errorState: { main } } = useContext(FormContext)


  return (
    <div className={Styles.errorWrap} data-testid="form-status">
      {isLoading && <Spinner className={Styles.spinner} />}
      {main && <span className={Styles.error} data-testid="error-message">{main}</span>}
    </div>
  )
}

export default FormStatus
