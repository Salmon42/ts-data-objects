//

export const isNum = () => true
// str
// bool
// other primitives


export const isBool = (value: unknown): value is boolean => typeof value === 'boolean'
