import { faKeyboard, faFire, faPhone } from "@fortawesome/free-solid-svg-icons";

// IMPORTANT
export const WEB_NAME = "E-KEYBOARD";
export const WEB_DESCRIPTION = "Chúng tôi cung cấp các sản phẩm bàn phím chất lượng với giá cả phải chăng.";
export const WEB_ICON = faKeyboard;
export const CREATOR = "KILLER";

// PAGES
export const HOME_PAGE_CONTENTS = {
	HOME_CARDS: [
		{
			title: `${WEB_NAME} chào mừng bạn`,
			description: [
				"Chúng tôi cung cấp các sản phẩm chất lượng với giá cả phải chăng.",
				"Đội ngũ hỗ trợ nhiệt tình luôn sẵn sàng giúp đỡ bạn.",
				"Chúng tôi giao hàng nhanh và đúng hẹn, đảm bảo sự hài lòng của bạn.",
			],
		},
		{
			title: "Ưu đãi đặc biệt",
			description: [
				"Nhận ưu đãi đặc biệt khi mua hàng và tiết kiệm hơn với các chương trình khuyến mãi.",
				"Chúng tôi có nhiều loại sản phẩm khác nhau, phù hợp với mọi nhu cầu của bạn.",
			],
			href: "/products",
			buttonText: "Xem sản phẩm",
			icon: faFire,
		},
		{
			title: "Dịch vụ khách hàng",
			description: [
				"Chúng tôi luôn lắng nghe và hỗ trợ khách hàng 24/7.",
				"Liên hệ với chúng tôi để được tư vấn và giải đáp mọi thắc mắc.",
			],
			href: "/contact",
			buttonText: "Liên hệ ngay",
			icon: faPhone,
		},
	],
};

// PAGES METADATA
export const HOME_PAGE_METADATA = {
	title: WEB_NAME,
	description: WEB_DESCRIPTION,
};

export const PRODUCTS_PAGE_METADATA = {
	title: "Sản phẩm",
	description: "Danh sách sản phẩm của chúng tôi.",
};

export const PRODUCT_PAGE_METADATA = {
	title: "Chi tiết sản phẩm",
	description: "Chi tiết sản phẩm.",
};

// FILTER & SORT
export const FILTER_FIELDS_OPTIONS = {
	brand: {
		title: "Brand",
		options: [
			"Keychron",
			"Akko",
			"Anne Pro",
			"Razer",
			"SteelSeries",
			"Corsair",
			"Logitech",
			"Varmilo",
			"Ducky",
			"Leopold",
			"Glorious",
			"NuPhy",
			"Drop",
			"Royal Kludge",
			"Epomaker",
			"KBDfans",
			"Meletrix",
			"Keydous",
			"Mode",
			"Owlab",
			"QwertyKeys",
			"Feker",
			"Monokei",
			"Vortex",
			"Filco",
		],
	},
	layout: {
		title: "Layout",
		options: ["75%", "96%", "60%", "Fullsize", "Tenkeyless", "65%", "TKL"],
	},
	caseMaterial: {
		title: "Case Material",
		options: ["Aluminum", "Walnut Wood", "Plastic", "Acrylic", "Metal", "Wood"],
	},
	collabTheme: {
		title: "Collaboration Theme",
		options: ["One Piece", "Anime", "Music", "None", "Game"],
	},
	rgbBacklit: { title: "RGB Backlight", options: ["Yes", "No"] },
	hotswap: { title: "Hot-swappable", options: ["Yes", "No"] },
	switchType: {
		title: "Switch Type",
		options: ["Mechanical Switch", "Optical Switch", "Low Profile Switch", "Gateron", "Kailh", "Cherry MX"],
	},
	rappodTrigger: { title: "Rappod Trigger", options: ["Yes", "No"] },
	tags: {
		title: "Tags",
		options: [
			"Artisan",
			"Custom",
			"Customizable",
			"DIY",
			"Hotswap",
			"Keyboard",
			"Limited Edition",
			"Low Profile",
			"Multi-Mode",
			"RGB Backlit",
			"Rappid Trigger",
			"Vintage",
		],
	},
};

export const SORT_OPTIONS = [
	{
		value: "default",
		label: "Mặc định",
	},
	{
		value: "price",
		label: "Giá: Thấp đến Cao",
		mongoSort: { price: 1 },
	},
	{
		value: "-price",
		label: "Giá: Cao đến Thấp",
		mongoSort: { price: -1 },
	},
	{
		value: "name",
		label: "Tên: A đến Z",
		mongoSort: { name: 1 },
	},
	{
		value: "-name",
		label: "Tên: Z đến A",
		mongoSort: { name: -1 },
	},
	{
		value: "layout",
		label: "Layout bàn phím",
		field: "layout",
		customOrder: {
			Fullsize: 1,
			TKL: 2,
			"75%": 3,
			"65%": 4,
			"60%": 5,
		},
	},
	{
		value: "caseMaterial",
		label: "Chất liệu vỏ",
		field: "caseMaterial",
		customOrder: {
			Aluminum: 1,
			Plastic: 2,
			Wood: 3,
			Metal: 4,
			Acrylic: 5,
		},
	},
];

// ITEM CARD NAVIGATE PATH
export const ITEM_CARD_NAVIGATE_PATH = "/product";