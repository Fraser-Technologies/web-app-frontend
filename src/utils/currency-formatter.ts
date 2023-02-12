export const currency_formatter = (n: number) => {
	return "NGN " + (Math.round(n * 100) / 100).toLocaleString();
};
