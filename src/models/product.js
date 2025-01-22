import normalize from "@/utils/normalize";
import { upperFirst } from "@/utils/text";

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
		this.id = normalize(_id?.toString());
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
			const name = upperFirst(this.name);
			const layout = this.layout.toLowerCase();
			const caseMaterial = upperFirst(this.caseMaterial);
			const switchType = upperFirst(this.switchType);

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
export function serializeProduct(input) {
	if (!input) return null;
	if (input._doc) {
		input = { ...input._doc, _id: input._id.toString() };
	}
	const product = input instanceof Product ? input : new Product(input);
	if (!validateProduct(product)) {
		throw new Error('Không thể chuyển đổi sang plain text ở hàm serializeProduct');
	}
	return {
		id: product.getId(),
		...product.getData()
	};
}

export function serializeProducts(products) {
	if (!Array.isArray(products)) return [];
	return products.map((product) => serializeProduct(product)).filter(Boolean);
}