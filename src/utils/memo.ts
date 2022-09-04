export const memoize = (callback: (...args: any[]) => any) => {
	const cache = {};
	return (...props: any) => {
		const key = JSON.stringify(props);
		// @ts-ignore
		if (!cache?.hasOwnProperty(key)) {
			// @ts-ignore
			cache[key] = callback(...props);
		}
		// @ts-ignore
		return cache?.[key];
	};
};
