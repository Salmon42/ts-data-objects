//
//
//

import { Expect } from '@/common/types'

/**
 * ...
 */
export type DataConstructor<T extends object> = (o?: Expect<T>) => T
