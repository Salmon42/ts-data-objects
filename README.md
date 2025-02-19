<h1 align="center">TS Data Objects</h1>

> Simple, lightweight, and flexible TypeScript library for creating type-safe data objects with validation.
>
> Implementation documentation can be found on https://salmon42.github.io/ts-data-objects.

<p align="center">
	<svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 16 16" fill="none">
		<path fill-rule="nonzero" clip-rule="nonzero" d="M0 1.75C0 0.783501 0.783502 0 1.75 0H14.25C15.2165 0 16 0.783502 16 1.75V3.75C16 4.16421 15.6642 4.5 15.25 4.5C14.8358 4.5 14.5 4.16421 14.5 3.75V1.75C14.5 1.61193 14.3881 1.5 14.25 1.5H1.75C1.61193 1.5 1.5 1.61193 1.5 1.75V14.25C1.5 14.3881 1.61193 14.5 1.75 14.5H15.25C15.6642 14.5 16 14.8358 16 15.25C16 15.6642 15.6642 16 15.25 16H1.75C0.783501 16 0 15.2165 0 14.25V1.75ZM4.75 6.5C4.75 6.08579 5.08579 5.75 5.5 5.75H9.25C9.66421 5.75 10 6.08579 10 6.5C10 6.91421 9.66421 7.25 9.25 7.25H8.25V12.5C8.25 12.9142 7.91421 13.25 7.5 13.25C7.08579 13.25 6.75 12.9142 6.75 12.5V7.25H5.5C5.08579 7.25 4.75 6.91421 4.75 6.5ZM11.2757 6.58011C11.6944 6.08164 12.3507 5.75 13.25 5.75C14.0849 5.75 14.7148 6.03567 15.1394 6.48481C15.4239 6.78583 15.4105 7.26052 15.1095 7.54505C14.8085 7.82958 14.3338 7.81621 14.0493 7.51519C13.9394 7.39898 13.7204 7.25 13.25 7.25C12.7493 7.25 12.5306 7.41836 12.4243 7.54489C12.2934 7.70065 12.25 7.896 12.25 8C12.25 8.104 12.2934 8.29935 12.4243 8.45511C12.5306 8.58164 12.7493 8.75 13.25 8.75C13.3257 8.75 13.3988 8.76121 13.4676 8.78207C14.1307 8.87646 14.6319 9.17251 14.9743 9.58011C15.3684 10.0493 15.5 10.604 15.5 11C15.5 11.396 15.3684 11.9507 14.9743 12.4199C14.5556 12.9184 13.8993 13.25 13 13.25C12.1651 13.25 11.5352 12.9643 11.1106 12.5152C10.8261 12.2142 10.8395 11.7395 11.1405 11.4549C11.4415 11.1704 11.9162 11.1838 12.2007 11.4848C12.3106 11.601 12.5296 11.75 13 11.75C13.5007 11.75 13.7194 11.5816 13.8257 11.4551C13.9566 11.2993 14 11.104 14 11C14 10.896 13.9566 10.7007 13.8257 10.5449C13.7194 10.4184 13.5007 10.25 13 10.25C12.9243 10.25 12.8512 10.2388 12.7824 10.2179C12.1193 10.1235 11.6181 9.82749 11.2757 9.41989C10.8816 8.95065 10.75 8.396 10.75 8C10.75 7.604 10.8816 7.04935 11.2757 6.58011Z" fill="#ffffff"/>
	</svg>
	<svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 24 24">
		<title>language_json</title>
		<rect width="24" height="24" fill="none"/>
		<path d="M5,3H7V5H5v5a2,2,0,0,1-2,2,2,2,0,0,1,2,2v5H7v2H5c-1.07-.27-2-.9-2-2V15a2,2,0,0,0-2-2H0V11H1A2,2,0,0,0,3,9V5A2,2,0,0,1,5,3M19,3a2,2,0,0,1,2,2V9a2,2,0,0,0,2,2h1v2H23a2,2,0,0,0-2,2v4a2,2,0,0,1-2,2H17V19h2V14a2,2,0,0,1,2-2,2,2,0,0,1-2-2V5H17V3h2M12,15a1,1,0,1,1-1,1,1,1,0,0,1,1-1M8,15a1,1,0,1,1-1,1,1,1,0,0,1,1-1m8,0a1,1,0,1,1-1,1A1,1,0,0,1,16,15Z" fill="#ffffff"/>
	</svg>
</p>

---

## Table of Contents
* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
  * [Basic Object Definition](#basic-object-definition)
  * [Using Individual Components](#using-individual-components)
* [Why `ts-data-objects`?](#why-ts-data-objects)
* [When to choose `ts-data-objects`](#when-to-choose-ts-data-objects)
* [License](#license)

---

## Introduction
`ts-data-objects` provides a lightweight way to create, validate, and parse TypeScript objects with user-defined runtime type checking. Unlike more complex validation libraries, it focuses on the essential task of ensuring data matches your TypeScript types - particularly useful when working with API responses or JSON data.

The library provides a compromise in balance between type safety and simplicity, allowing you to use as much or as little of its functionality as you need - from simple object construction with defaults to complete type-safe parsing and validation.


## Installation
You can install this package from NPM registry https://www.npmjs.com/package/ts-data-objects.

```bash
npm install ts-data-objects
```


## Usage
The library is exported with multiple entry points to allow granular usage of the available functionality.

```typescript
// Importing everything from single entry point
import { ... } from 'ts-data-objects'

// Importing only partial functionality
import { ... } from 'ts-data-objects/common'
import { ... } from 'ts-data-objects/core'
import { ... } from 'ts-data-objects/deep'
```

### Basic Object Definition
```typescript
import { defineObject, isStr, isNum } from 'ts-data-objects'

// Define your TypeScript type. It may clash with generated constructor
type User = {
  name: string
  age: number
  verified?: boolean
}

// Create a complete object definition with validation
const { User, validUser, parseUser } = defineObject<User>('User', {
  // Default values
  defaultValues: {
    verified: false
  },
  // Type validation predicate
  predicate: o => (
    isStr(o?.name) &&
    isNum(o?.age)
  ),
  // doNotThrow: true // -> if this is set to true, you don't need to catch any error, it will only log console.error by itself
})

// Create a new user with defaults. Must provide both name and age accorting to TS type/interface
const user1 = User({ name: 'John', age: 20 })
// Result: { name: 'John', age: 20, verified: false }

// Validate unknown data
if (validUser(someData)) {
	// TS now knows that someData is User
	console.log(someData.name, someData.age)
}

// Safely parse unknown data (throws on invalid data)
// Throwing behavior may be changed with doNotThrow param in defineObject
try {
	const user2 = parseUser(apiResponse)
	console.log(user2.name)
}
catch (e: any) {
	//
	console.error(e)
}
```

### Using Individual Components
The library can be used modularly - you don't need to use all features:

```typescript
import { dataObject, dataGuard } from 'ts-data-objects/core'
import { isStr, isNum } from 'ts-data-objects/common'

type User = {
	name: string
	age: number
	verified?: boolean
}

// Just create objects with defaults
const User = dataObject<User>({
  verified: false,
	// Here you an provide any default-like values to fill
	// if you don't get them from API response or want them
	// to be created automatically.
})

// Only guard function
const isUser = dataGuard<User>(o => (
  isStr(o?.name) &&
  isNum(o?.age)
	// You can use either helping typechecking functions
	// from 'ts-data-objects/common'
	// or use your own validation logic.
))
```

## Why `ts-data-objects`?
This library is not at all something new in the web development environment. We already have well known and battle-tested libraries like **[Zod](https://github.com/colinhacks/zod)** and **[Yup](https://github.com/jquense/yup)**. While these libraries are excellent for comprehensive schema validation, ts-data-objects takes a different approach:

#### ✅ 1. Simplicity first
* ts-data-objects focuses purely on TypeScript type validation
* No complex schema definition language to learn
* Uses standard TypeScript types and JavaScript type checks
* Smaller learning curve

#### 💪 2. Flexible
* Availability of modular design - use only what you need
* No lock-in to a specific validation paradigm
* Works well as just a typed constructor utility

#### 🔄 3. Type-System Aligned
* Works with your existing TypeScript interfaces
* No need to maintain or create separate schema definitions

#### ☁ 4. Lightweight
* Easy to integrate into existing project
* No dependencies, small bundle size

## When to choose `ts-data-objects`
`ts-data-objects` is ideal for projects that need straightforward type validation without the complexity of full schema validation libraries. It's particularly well-suited for API integration layers and internal data management where TypeScript types are the source of truth.

✅ **Choose ts-data-objects when you**:
* Need simple type validation for API responses
* Want to ensure data matches TypeScript types at runtime
* Need object construction with defaults
* Prefer using standard TypeScript types instead of reconstructing them with 3rd party library schemas
* Want a minimal, lightweight solution

❌ **Consider Zod or Yup when you need**:
* Complex validation rules (email formats, regex, etc.) out of the box
* Value transformations and coercion
* Advanced string/number constraints



## License
This library is released under [MIT license](https://opensource.org/license/MIT), which means that you can reuse any part of code here for your convenience.

Copyright (C) 2025-present, Andrej Hučko

<p align="center">
<b>If you like this library, don't hesitate to give this repository a star! 😊</b>
</p>


* ~

