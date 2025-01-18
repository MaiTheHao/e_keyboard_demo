"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import normalize from "@/utils/normalize";
import { searchByName } from "@/lib/searchProduct";
import styles from "./ProductsTop.module.scss";
import ItemCardHorizon from "../../../itemCard/ItemCardHorizon";

const FETCH_ACTION_DELAY = 250;
const CACHE_LIMIT = 10;
const SEARCH_LIMIT = 100;

function ProductsTopSearch() {
	const [searchState, setSearchState] = useState({
		term: "",
		results: [],
		isLoading: false,
	});
	const searchCache = useRef(new Map());

	const handleCache = {
		get: useCallback((term) => {
			const normalizedTerm = normalize(term);
			return searchCache.current.get(normalizedTerm);
		}, []),

		set: useCallback((term, results) => {
			const normalizedTerm = normalize(term);
			searchCache.current.set(normalizedTerm, results);
		}, []),

		cleanup: useCallback(() => {
			if (searchCache.current.size > CACHE_LIMIT) {
				const keys = Array.from(searchCache.current.keys());
				keys.slice(0, 50).forEach((key) => searchCache.current.delete(key));
			}
		}, []),
	};

	const handleSearch = useCallback(async (term) => {
		const normalizedTerm = normalize(term);

		if (!normalizedTerm) {
			setSearchState((prev) => ({ ...prev, results: [], isLoading: false }));
			return;
		}

		try {
			const products = await searchByName(normalizedTerm, SEARCH_LIMIT);
			handleCache.set(normalizedTerm, products);
			setSearchState((prev) => ({ ...prev, results: products, isLoading: false }));
		} catch (error) {
			setSearchState((prev) => ({ ...prev, results: [], isLoading: false }));
		}

		handleCache.cleanup();
	}, []);

	const handleInputChange = useCallback((event) => {
		const { value } = event.target;
		setSearchState((prev) => ({
			...prev,
			term: value,
			isLoading: !!value,
		}));
	}, []);

	useEffect(() => {
		const normalizedTerm = normalize(searchState.term);

		if (searchCache.current.has(normalizedTerm)) {
			setSearchState((prev) => ({
				...prev,
				results: searchCache.current.get(normalizedTerm),
				isLoading: false,
			}));
			return;
		}

		const timeOutId = setTimeout(() => handleSearch(searchState.term), FETCH_ACTION_DELAY);
		return () => clearTimeout(timeOutId);
	}, [searchState.term, handleSearch]);

	return (
		<div className={styles.search}>
			<div className={styles.searchBar}>
				<input type="text" placeholder="Tìm kiếm sản phẩm..." value={searchState.term} onChange={handleInputChange} />
				<FontAwesomeIcon
					icon={searchState.isLoading ? faSpinner : faSearch}
					style={searchState.isLoading ? { color: "var(--primary-bg)" } : undefined}
					spin={searchState.isLoading}
				/>
			</div>
			<ul className={`${styles.searchResultsWrapper} ${clsx({ hidden: !normalize(searchState.term) })}`}>
				{searchState.results.length > 0
					? searchState.results.map((product, index) => <ItemCardHorizon key={index} product={product} />)
					: !searchState.isLoading && <li className={styles.noResults}>Không tìm thấy sản phẩm nào</li>}
			</ul>
		</div>
	);
}

export default ProductsTopSearch;
