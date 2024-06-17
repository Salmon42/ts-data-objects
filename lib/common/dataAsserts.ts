//
// TODO
//

/**
 * Assertion function for boolean
 * @category Common Utils
 */
export const isBool = (value: unknown): value is boolean => typeof value === 'boolean'


/**
 * Assertion function for number
 * @category Common Utils
 */
export const isNum = (value: unknown): value is number => typeof value === 'number'


/**
 * Assertion function for string
 * @category Common Utils
 */
export const isStr = (value: unknown): value is string => typeof value === 'string'
