export default function convertToPercent(num, dom, dec = 0) {
	return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  }).format(num / dom);
}
