<h1 align="center" id="top">TS Data Objects</h1>

> Simple, lightweight, and flexible TypeScript library for creating type-safe data objects with validation.
>
> Implementation documentation can be found on https://salmon42.github.io/ts-data-objects.
>
> Changelog can be found [**here**](https://github.com/Salmon42/ts-data-objects/blob/master/readme/CHANGELOG.md)
---

<p align="center">
	<a href="#top" target="_blank" rel="noreferrer">
		<img src="https://raw.githubusercontent.com/Salmon42/ts-data-objects/refs/heads/master/readme/ts.svg" alt="TypeScript" width="64px" height="64px" />
		<img src="https://raw.githubusercontent.com/Salmon42/ts-data-objects/refs/heads/master/readme/json.svg" alt="JSON" width="64px" height="64px" />
	</a>
</p>

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
import { ... } from 'ts-data-objects/deep' // Currently only experimental
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
const { User, isUser, parseUser } = defineObject<User>('User', {
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
if (isUser(someData)) {
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

Copyright (C) 2025-present, **[Andrej Hučko](https://www.linkedin.com/in/andrejhucko/)**

<p align="center">
<b>If you like this library, don't hesitate to give this repository a star! 😊</b>
</p>


* ~

