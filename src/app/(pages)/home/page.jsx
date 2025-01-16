import React from "react";
import HomeCard from "@/app/ui/components/pages/home/HomeCard";
import { HOME_PAGE_CONTENTS } from "@/app/constants";

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
