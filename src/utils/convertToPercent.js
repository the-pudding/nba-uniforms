export default function convertToPercent(num, dom) {
	return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num / dom);
}
