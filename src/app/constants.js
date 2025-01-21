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