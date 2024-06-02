export const p = () => {
	console.info('Running implementation')
}

export const debug = (data: any) => {
	document.getElementById('debug').innerHTML = JSON.stringify(data, null, 4)
}
