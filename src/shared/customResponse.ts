import { Response } from 'express'
import httpStatus from 'http-status'
import { IGenericResponse } from '../interfaces/sharedInterface'

export const sendSuccessResponse = <T>(
  res: Response,
  data: IGenericResponse<T>
): void => {
  const response: IGenericResponse<T> = {
    statusCode: httpStatus.OK,
    success: true,
    meta: data.meta,
    data: data.data,
    message: data.message || 'Success',
  }
  res.status(httpStatus.OK).json(response)
}
