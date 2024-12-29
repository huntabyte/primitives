interface NavigatorUAData {
	brands: Array<{ brand: string; version: string }>;
	mobile: boolean;
	platform: string;
}

export function getPlatform(): string {
	// eslint-disable-next-line ts/no-explicit-any
	const uaData = (navigator as any).userAgentData as NavigatorUAData | undefined;
	if (uaData?.platform) return uaData.platform;
	return navigator.platform;
}

export function getUserAgent(): string {
	// eslint-disable-next-line ts/no-explicit-any
	const uaData = (navigator as any).userAgentData as NavigatorUAData | undefined;

	if (uaData && Array.isArray(uaData.brands)) {
		return uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ");
	}

	return navigator.userAgent;
}

export function isSafari() {
	// Chrome DevTools does not complain about navigator.vendor
	return /apple/i.test(navigator.vendor);
}
export function isAndroid() {
	const re = /android/i;
	return re.test(getPlatform()) || re.test(getUserAgent());
}

export function isMac() {
	return getPlatform().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
