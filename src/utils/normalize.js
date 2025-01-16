// Normalize helper
/**
 * Chuẩn hóa giá trị đầu vào theo các tùy chọn được chỉ định
 * 
 * @param {*} value - Giá trị cần chuẩn hóa
 * @param {Object} [options={}] - Các tùy chọn chuẩn hóa
 * @param {boolean} [options.trim=true] - Xóa khoảng trắng ở đầu và cuối chuỗi
 * @param {boolean} [options.lowercase=true] - Chuyển chuỗi thành chữ thường
 * @param {boolean} [options.isArray=false] - Xác định có phải xử lý mảng hay không
 * @returns {*} Giá trị đã được chuẩn hóa
 * 
 * @example
 * normalize('  Hello World  ') // => 'hello world'
 * normalize(['  A  ', '  B  '], { isArray: true }) // => ['a', 'b']
 * normalize(null) // => null
 * normalize(123) // => 123
 */
function normalize(value, options = {}) {
	const { trim = true, lowercase = true, isArray = false } = options;
	
	if (value === null || value === undefined) return value;
	
	if (isArray && Array.isArray(value)) {
		return value.map(item => normalize(item, options));
	}
	
	if (typeof value === 'string') {
		let normalized = value;
		if (trim) normalized = normalized.trim();
		if (lowercase) normalized = normalized.toLowerCase();
		return normalized;
	}
	
	return value;
}

export default normalize;