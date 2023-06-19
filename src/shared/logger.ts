import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf } = format
import path from 'path'

// Custom Log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp).toDateString()
  const hour = new Date(timestamp).getHours()
  const minutes = new Date(timestamp).getMinutes()
  const seconds = new Date(timestamp).getSeconds()
  const time = `${hour}:${minutes}:${seconds}`
  return `${date} | ${time} [${label}] ${level}: ${message}`
})

const successLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Success Log' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'phu-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Error Log' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        'phu-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { successLogger, errorLogger }
