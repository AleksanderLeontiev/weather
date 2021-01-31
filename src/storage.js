export async function getStorage(key) {
	const item = await localStorage.getItem(key);
	return JSON.parse(item) || [];
}

export async function setStorage(key, value) {
	await localStorage.setItem(key, JSON.stringify(value));
}
