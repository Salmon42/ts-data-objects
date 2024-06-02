//
// Helper functions for scripts
//

/** @param {string} msg */
export const print = (msg) => {
	console.info(`---- ---- ${msg}`)
}

export const unusedDummy = (someInput) => {
	switch (someInput) {
	case 'ok': return true
	}
	return false
}
