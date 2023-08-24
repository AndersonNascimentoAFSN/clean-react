import React, { useContext } from 'react'
import Spinner from '../spinner/spinner'
import { FormContext } from '@/presentation/contexts'
import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext)


  return (
    <div className={Styles.errorWrap}  data-testid="form-status">
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error} data-testid="error-message">{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
