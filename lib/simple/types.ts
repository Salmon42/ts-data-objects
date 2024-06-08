//
//
//

import { Expect } from '@/core/types'

/**
 * ...
 */
export type DataConstructor<T extends object> = (o?: Expect<T>) => T
