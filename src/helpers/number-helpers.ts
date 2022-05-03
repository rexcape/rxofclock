export const numberHelpers = {
  toFixed: (val: unknown, precision: number) => {
    switch (typeof val) {
      case 'string':
        return parseFloat(val).toFixed(precision)
      case 'number':
        return val.toFixed(precision)
      default:
        return ''
    }
  },
}
