const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  const outputObject: Partial<T> = {}

  keys.forEach(key => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      outputObject[key] = obj[key]
    }
  })

  return outputObject
}

export default pick
