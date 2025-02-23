/**
 * @module types
 * @description
 * Type definitions for the ts-data-objects library.
 *
 * Assertions:
 * - `Predicate<T>` - Basic type predicate
 * - `PredicateFunction<T>` - Function that checks if a value matches type T
 *
 * Common Utils:
 * - `Expect<T>` - Partial type helper for optional properties
 *
 * Core Component Types:
 * - `DataObjectGuard<T>` - Type guard for data objects
 * - `GuardPredicate<T>` - Type guard predicate
 *
 * Core Implementation Types:
 * - `DataConstructor<T>` - Constructor function for type T
 * - `DefinedObject<T>` - Object with defined structure
 * - `NamedConstructor<T>` - Named object constructor
 * - `NamedGuard<T>` - Named type guard
 * - `NamedParser<T>` - Named data parser
 * - `DefineObjectParams<T>` - Parameters for object definition
 *
 * Experimental Implementation Types:
 * - `DataModelGuards` - Collection of data model guards
 * - `DataModelRule` - Single validation rule
 * - `DataModelRules` - Collection of validation rules
 * - `DataModelRulesObject` - Object containing validation rules
 * - `AssertionFunction` - Function for asserting conditions
 * - `IsFunction` - Type checking function
 * - `DeepGuardIsFunction` - Deep type checking function
 * - `DeepGuardAssertionFunction` - Deep assertion function
 * - `DeepGuardInnerIsFunction` - Inner deep type checking
 * - `DeepGuardInnerAssertionFunction` - Inner deep assertion
 *
 * @packageDocumentation
 */

export type {
	Expect,
	DataObjectGuard,
	GuardPredicate,
	Predicate,
	PredicateFunction,
} from '@/common/types'

export type {
	DataConstructor,
	DefinedObject,
	NamedConstructor,
	NamedGuard,
	NamedParser,
	DefineObjectParams,
} from '@/core/types'

export type {
	DataModelGuards,
	DataModelRule,
	AssertionFunction,
	DataModelRules,
	DataModelRulesObject,
	DeepGuardAssertionFunction,
	DeepGuardInnerAssertionFunction,
	DeepGuardInnerIsFunction,
	DeepGuardIsFunction,
	IsFunction,
} from '@/deep/types'
