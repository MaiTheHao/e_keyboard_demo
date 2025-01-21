export const FILTER_FIELDS_OPTIONS = {
	brand: {
		title: "Brand",
		options: ["Keychron", "Ducky", "Varmilo", "Leopold", "Akko", "Vortex", "Anne Pro", "Filco"],
	},
	layout: {
		title: "Layout",
		options: ["60%", "65%", "75%", "TKL", "Fullsize"],
	},
	caseMaterial: {
		title: "Case Material",
		options: ["Aluminum", "Plastic", "Wood", "Metal", "Acrylic"],
	},
	collabTheme: {
		title: "Collaboration Theme",
		options: ["Anime", "Game", "Movie", "Music", "Art"],
	},
	rgbBacklit: {
		title: "RGB Backlight",
		options: ["Yes", "No"],
	},
	hotswap: {
		title: "Hot-swappable",
		options: ["Yes", "No"],
	},
	switchType: {
		title: "Switch Type",
		options: ["Cherry MX", "Gateron", "Kailh", "Zealios", "Topre"],
	},
	rappodTrigger: {
		title: "Rappod Trigger",
		options: ["Yes", "No"],
	},
	tag: {
		title: "Tags",
		options: ["Custom", "Limited Edition", "Artisan", "Vintage", "Customizable"],
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
			"Fullsize": 1,
			"TKL": 2,
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
			"Aluminum": 1,
			"Plastic": 2,
			"Wood": 3,
			"Metal": 4,
			"Acrylic": 5,
		},
	},
];

// db.products.aggregate([
//     {
//       $addFields: {
//         sortOrder: {
//           $switch: {
//             branches: [
//               { case: { $eq: ["$special", "Hào"] }, then: 1 },
//               { case: { $eq: ["$special", "Ba"] }, then: 2 },
//               { case: { $eq: ["$special", "Tỷ"] }, then: 3 },
//               { case: { $eq: ["$special", "Huỳnh"] }, then: 4 }
//             ],
//             default: 99 // Giá trị mặc định nếu không khớp
//           }
//         }
//       }
//     },
//     { $sort: { sortOrder: 1 } },
//     { $project: { sortOrder: 0 } } // Loại bỏ field tạm nếu không cần thiết
//   ]);
