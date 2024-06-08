//
// TODO
//

export const isBool = (value: unknown): value is boolean => typeof value === 'boolean'
export const isNum = (value: unknown): value is number => typeof value === 'number'
export const isStr = (value: unknown): value is string => typeof value === 'string'
