import React from "react";
import HomeCard from "@/app/ui/components/pages/home/HomeCard";
import { HOME_PAGE_CONTENTS } from "@/app/constants";

export const metadata = {
	title: "Home",
	description: "Trang chủ của cửa hàng"
}

async function HomePage() {
	return (
		<>
			{HOME_PAGE_CONTENTS.HOME_CARDS.map((card, index) => (
				<HomeCard key={`${card.title}-${index}`} {...card} />
			))}
		</>
	);
}

export default HomePage;
