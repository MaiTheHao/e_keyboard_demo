import normalize from "@/utils/normalize";

/**
 * Đại diện cho một sản phẩm bàn phím trong hệ thống
 * @class
 * @param {Object} options - Các thuộc tính của sản phẩm
 * @param {string|null} [options.id=null] - ID của sản phẩm
 * @param {string} [options.name=""] - Tên sản phẩm
 * @param {string} [options.category=""] - Danh mục sản phẩm
 * @param {string} [options.brand=""] - Thương hiệu
 * @param {string} [options.layout=""] - Kiểu bố trí phím
 * @param {string} [options.caseMaterial=""] - Chất liệu vỏ
 * @param {string} [options.collabTheme=""] - Chủ đề hợp tác (nếu có)
 * @param {boolean} [options.rgbBacklit=false] - Có đèn nền RGB hay không
 * @param {boolean} [options.hotswap=false] - Có hỗ trợ hotswap switch hay không
 * @param {string} [options.switchType=""] - Loại switch
 * @param {boolean} [options.rappodTrigger=false] - Có tính năng rappod trigger hay không
 * @param {Array<string>} [options.tags=[]] - Các thẻ tag của sản phẩm
 * @param {number} [options.price=0] - Giá sản phẩm
 * @param {string} [options.currency="VND"] - Đơn vị tiền tệ
 * @param {string} [options.model=""] - Mã model
 * @param {string} [options.series=""] - Dòng sản phẩm
 * @param {number} [options.stock=0] - Số lượng tồn kho
 */
export default class Product {
	constructor({
		_id = null,
		name = "",
		category = "",
		brand = "",
		layout = "",
		caseMaterial = "",
		collabTheme = "",
		rgbBacklit = false,
		hotswap = false,
		switchType = "",
		rappodTrigger = false,
		tags = [],
		price = 0,
		currency = "VND",
		model = "",
		series = "",
		stock = 0,
		description = null,
	} = {}) {
		this.id = normalize(_id);
		this.name = normalize(name);
		this.category = normalize(category);
		this.brand = normalize(brand);
		this.layout = normalize(layout);
		this.caseMaterial = normalize(caseMaterial);
		this.collabTheme = normalize(collabTheme);
		this.rgbBacklit = rgbBacklit;
		this.hotswap = hotswap;
		this.switchType = normalize(switchType);
		this.rappodTrigger = rappodTrigger;
		this.tags = normalize(tags, { isArray: true });
		this.price = Number(price) || 0;
		this.currency = currency;
		this.model = model;
		this.series = series;
		this.stock = Number(stock) || 0;
		this.description = description?.trim() || null;
		this.initSpecialFields();
	}

	initSpecialFields() {
		if (!this.description) {
			const name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
			const layout = this.layout.toLowerCase();
			const caseMaterial = this.caseMaterial.charAt(0).toUpperCase() + this.caseMaterial.slice(1).toLowerCase();
			const switchType = this.switchType.charAt(0).toUpperCase() + this.switchType.slice(1).toLowerCase();

			this.description = `${name} - ${layout} layout, ${caseMaterial} case, ${switchType} switches.`;
		}
	}

	getData() {
		const { id, ...data } = this;
		return data;
	}

	getId() {
		return this.id;
	}

	update(data) {
		Object.assign(this, data);
		return updateProduct(this);
	}
}

// Middleware
export function convertToProduct(doc) {
	return new Product({
		...doc,
		_id: doc._id.toString(),
	});
}

export function convertToProducts(docs) {
	return docs.map((doc) => convertToProduct(doc));
}

// Validation helper
export function validateProduct(product) {
	if (!product || !(product instanceof Product)) return false;
	if (!product.name || typeof product.name !== "string") return false;
	if (product.description !== null && typeof product.description !== "string") return false;
	if (!product.category || typeof product.category !== "string") return false;
	if (!product.brand || typeof product.brand !== "string") return false;
	if (!product.layout || typeof product.layout !== "string") return false;
	if (!product.caseMaterial || typeof product.caseMaterial !== "string") return false;
	if (product.collabTheme !== null && typeof product.collabTheme !== "string") return false;
	if (typeof product.rgbBacklit !== "boolean") return false;
	if (typeof product.hotswap !== "boolean") return false;
	if (!product.switchType || typeof product.switchType !== "string") return false;
	if (typeof product.rappodTrigger !== "boolean") return false;
	if (!Array.isArray(product.tags)) return false;
	if (typeof product.price !== "number") return false;
	if (!product.currency || typeof product.currency !== "string") return false;
	if (!product.model || typeof product.model !== "string") return false;
	if (!product.series || typeof product.series !== "string") return false;
	if (typeof product.stock !== "number") return false;
	return true;
}

// Chuyển đổi dữ liệu giữa Product và Object JSON
export function serializeProduct(product) {
	if (!product || !(product instanceof Product)) return null;
	return {
		...product.getData(),
		id: product.getId()
	};
}

export function serializeProducts(products) {
	if (!Array.isArray(products)) return [];
	return products.map(product => serializeProduct(product));
}

// Product Schema Example
/*
{
	_id: ObjectId('6786515b0fd9afe1b707ccef'),
	name: 'Keychron K2',
	category: 'Keyboard',
	brand: 'Keychron',
	layout: '75%',
	caseMaterial: 'Aluminum',
	collabTheme: null,
	rgbBacklit: true,
	hotswap: true,
	switchType: 'Mechanical Switch',
	rappodTrigger: false,
	tags: [ 'Keyboard', 'RGB Backlit', 'Hotswap' ],
	price: 89.99,
	currency: 'USD',
	model: 'K2',
	series: 'K',
	stock: 100
}
*/
