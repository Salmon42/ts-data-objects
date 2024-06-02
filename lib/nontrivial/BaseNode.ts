import { BASE_SPECIFIER } from '@/constants/nodes'

/**
 * something something basenode
 */
export class BaseNode {
	protected __classname: string

	constructor(
		public injection: string,
		public specifier: string = BASE_SPECIFIER,
	) {
		// During minification build, the `this.constructor.name`
		// gets scrapped and is transformed into different string
		// (something unreadable)
		this.__classname = 'BaseNode'
		this.injection = injection
		this.specifier = specifier
	}

	logError(...messages: any[]) {
		console.info(`[${this.__classname}]`, messages)
	}
}
