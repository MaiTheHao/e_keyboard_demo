"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { searchByName } from "@/lib/search";
import normalize from "@/utils/normalize";
import styles from "./ProductsTop.module.scss";

const FETCH_ACTION_DELAY = 500; // miliseconds

function Search() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [debounceTimer, setDebounceTimer] = useState(null);

	const handleSearch = async (term) => {
		const normalizedTerm = normalize(term);
		
		if (!normalizedTerm) {
			setSearchResults([]);
			return;
		}

		setIsLoading(true);
		try {
			const products = await searchByName(normalizedTerm);
			setSearchResults(products);
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		const newTimer = setTimeout(() => {
			handleSearch(searchTerm);
		}, FETCH_ACTION_DELAY);

		setDebounceTimer(newTimer);

		return () => {
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
		};
	}, [searchTerm]);

	return (
		<div className={styles.searchBlock}>
			<input
				type="text"
				placeholder="Tìm kiếm sản phẩm..."
				value={searchTerm}
				onChange={handleInputChange}
			/>
			<FontAwesomeIcon
				icon={isLoading ? faSpinner : faSearch}
				style={isLoading ? { color: "var(--primary-bg)" } : undefined}
				spin={isLoading}
			/>
		</div>
	);
}

export default Search;
