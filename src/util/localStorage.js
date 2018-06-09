export const get = async key => browser.storage.local.get(key);

export const set = async (key, value) => {
	const data = {
		[key]: value
	};
	return browser.storage.local.set(data);
};
