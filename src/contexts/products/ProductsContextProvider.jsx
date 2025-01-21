"use client";
import { useState } from "react";
import ProductsContext from "./ProductsContext";

const filterFieldsOptions = {
	brand: ["Keychron", "Ducky", "Varmilo", "Leopold", "Akko", "Vortex", "Anne Pro", "Filco"],
	layout: ["60%", "65%", "75%", "TKL", "Fullsize"],
	caseMaterial: ["Aluminum", "Plastic", "Wood", "Metal", "Acrylic"],
	collabTheme: ["Anime", "Game", "Movie", "Music", "Art"],
	rgbBacklit: ["Yes", "No"],
	hotswap: ["Yes", "No"],
	switchType: ["Cherry MX", "Gateron", "Kailh", "Zealios", "Topre"],
	rappodTrigger: ["Yes", "No"],
	tag: ["Custom", "Limited Edition", "Artisan", "Vintage", "Customizable"],
};

export default function ProductsContextProvider({ children }) {
	const [filter, setFilter] = useState({
		brand: [],
		layout: [],
		caseMaterial: [],
		collabTheme: [],
		rgbBacklit: null,
		hotswap: null,
		switchType: [],
		rappodTrigger: null,
		tag: [],
	});
	const handleSetFilter = (setup) => {
		const updatedSetup = { ...setup };
		setFilter((prevFilter) => ({ ...prevFilter, ...updatedSetup }));
	};

	const values = {
        filterFieldsOptions,
		filter,
		handleSetFilter,
	};
	return <ProductsContext.Provider value={values}>{children}</ProductsContext.Provider>;
}
