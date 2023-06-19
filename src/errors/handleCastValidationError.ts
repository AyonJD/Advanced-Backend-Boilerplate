import mongoose from 'mongoose'
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/errorInterface'
import httpStatus from 'http-status'

const handleCastValidationError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      message: error.message,
      path: error.path,
    },
  ]

  const statusCode = httpStatus.INTERNAL_SERVER_ERROR
  return {
    status: 'false',
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  }
}

export default handleCastValidationError
