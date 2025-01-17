"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { searchByName } from "@/lib/search";
import normalize from "@/utils/normalize";
import styles from "./ProductsTop.module.scss";
import ItemCardHorizon from "../../../itemCard/ItemCardHorizon";
import clsx from "clsx";

const FETCH_ACTION_DELAY = 500; // miliseconds

function ProductsTopSearch() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = useCallback(async (term) => {
		const normalizedTerm = normalize(term);

		if (!normalizedTerm) {
			setSearchResults([]);
			return;
		}

		setIsLoading(true);
		try {
			const products = await searchByName(normalizedTerm, 100);
			setSearchResults(products);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const handleInputChange = useCallback((event) => {
		setSearchTerm(event.target.value);
	}, []);

	useEffect(() => {
		const timeOutId = setTimeout(() => handleSearch(searchTerm), FETCH_ACTION_DELAY);
		return () => clearTimeout(timeOutId);
	}, [searchTerm, handleSearch]);

	return (
		<div className={styles.search}>
			<div className={styles.searchBar}>
				<input type="text" placeholder="Tìm kiếm sản phẩm..." value={searchTerm} onChange={handleInputChange} />
				<FontAwesomeIcon
					icon={isLoading ? faSpinner : faSearch}
					style={isLoading ? { color: "var(--primary-bg)" } : undefined}
					spin={isLoading}
				/>
			</div>
			<ul className={`${styles.searchResultsWrapper} ${clsx({ "hidden": searchResults.length === 0 })}`}>
				{
					searchResults.map((product, index) => <ItemCardHorizon key={index} product={product} />)
				}
			</ul>
		</div>
	);
}

export default ProductsTopSearch;
