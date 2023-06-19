import { ZodError, ZodIssue } from 'zod'
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/errorInterface'

const handleZodValidationError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      message: issue.message,
      path: issue.path[issue.path.length - 1] as string,
    }
  })

  const statusCode = 400
  return {
    status: 'false',
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleZodValidationError
