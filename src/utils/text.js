export function capitalize(text) {
	if (!text) return '';
	return text
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

export function upperFirst(text) {
	if (!text) return '';
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export function generateCurrencyString(price, currency) {
	if (!price) return '';
	if (!currency) return price.toLocaleString();
	let local;
	switch (currency) {
		case 'VND':
			local = 'vi-VN';
			break;
		case 'USD':
			local = 'en-US';
			break;
		case 'EUR':
			local = 'de-DE';
			break;
		case 'JPY':
			local = 'ja-JP';
			break;
		default:
			local = 'en-US';
	}
	return `${price.toLocaleString(local)}`;
}
