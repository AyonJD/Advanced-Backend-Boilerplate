import mongoose from 'mongoose'
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/errorInterface'

const handleMongooseValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        message: el.message,
        path: el.path,
      }
    }
  )

  const statusCode = 400
  return {
    status: 'false',
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleMongooseValidationError
