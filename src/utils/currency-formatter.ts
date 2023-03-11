export const currency_formatter = (n: number) => {
	return "₦ " + (Math.round(n * 100) / 100).toLocaleString();
};
