"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import normalize from "@/utils/normalize";
import { searchByTerm } from "@/lib/searchProduct";
import styles from "./Header.module.scss";
import ItemCardHorizon from "../itemCard/ItemCardHorizon";

const FETCH_ACTION_DELAY = 250;
const CACHE_LIMIT = 10;
const SEARCH_LIMIT = 20;

function HeaderSearchBar() {
	const [searchState, setSearchState] = useState({
		loadMoreCounter: 0,
		term: "",
		input: "",
		results: [],
		isLoading: false,
		remain: false,
	});
	const searchCache = useRef(new Map());

	const handleCache = {
		get: useCallback((term) => {
			const normalizedTerm = normalize(term);
			return searchCache.current.get(normalizedTerm);
		}, []),

		set: useCallback((term, results, remain) => {
			const normalizedTerm = normalize(term);
			searchCache.current.set(normalizedTerm, { results: results, remain: remain });
		}, []),

		cleanup: useCallback(() => {
			if (searchCache.current.size > CACHE_LIMIT) {
				const keys = Array.from(searchCache.current.keys());
				keys.slice(0, CACHE_LIMIT).forEach((key) => searchCache.current.delete(key));
			}
		}, []),
	};

	const handleSearch = useCallback(async (term) => {
		if (!term) {
			setSearchState((prev) => ({ ...prev, results: [], isLoading: false, remain: false }));
			return;
		}

		try {
			const products = await searchByTerm(term, SEARCH_LIMIT + 1);
			const hasMore = products.length > SEARCH_LIMIT;
			handleCache.set(term, products.slice(0, SEARCH_LIMIT), hasMore);
			setSearchState((prev) => ({
				...prev,
				results: products.slice(0, SEARCH_LIMIT),
				isLoading: false,
				remain: hasMore,
			}));
		} catch (error) {
			setSearchState((prev) => ({ ...prev, results: [], isLoading: false, remain: false }));
		}

		handleCache.cleanup();
	}, []);

	const handleSearchMore = useCallback(async () => {
		const skip = (searchState.loadMoreCounter + 1) * SEARCH_LIMIT;
		const results = await searchByTerm(searchState.term, SEARCH_LIMIT + 1, skip);
		const hasMore = results.length > SEARCH_LIMIT;
		setSearchState((prev) => ({
			...prev,
			results: [...prev.results, ...results.slice(0, SEARCH_LIMIT)],
			loadMoreCounter: prev.loadMoreCounter + 1,
			remain: hasMore,
		}));
	}, [searchState.term, searchState.loadMoreCounter]);

	const handleInputChange = useCallback((event) => {
		const { value } = event.target;
		setSearchState((prev) => ({
			...prev,
			input: value,
			term: normalize(value),
			isLoading: !!value,
		}));
	}, []);

	useEffect(() => {
		if (searchCache.current.has(searchState.term)) {
			setSearchState({
				...searchState,
				remain: searchCache.current.get(searchState.term).remain,
				results: searchCache.current.get(searchState.term).results,
				isLoading: false,
			});
			return;
		}

		const timeOutId = setTimeout(() => handleSearch(searchState.term), FETCH_ACTION_DELAY);
		return () => clearTimeout(timeOutId);
	}, [searchState.input, searchState.term, handleSearch]);

	return (
		<>
			<div className={styles.searchBar}>
				<input type="text" placeholder="Tìm kiếm sản phẩm..." value={searchState.input} onChange={handleInputChange} />
				<FontAwesomeIcon
					icon={searchState.isLoading ? faSpinner : faSearch}
					style={searchState.isLoading ? { color: "var(--primary-bg)" } : undefined}
					spin={searchState.isLoading}
				/>
			</div>
			<ul className={`${styles.searchResultsWrapper} ${clsx({ hidden: !searchState.term })}`}>
				{searchState.results.length > 0 ? (
					<>
						{searchState.results.map((product, index) => (
							<ItemCardHorizon key={index} product={product} />
						))}
						{(searchState.remain && (
							<button type="button" className={styles.viewMore} onClick={handleSearchMore}>
								Xem thêm sản phẩm
							</button>
						)) || <li className={styles.noResults}>Không còn sản phẩm nào</li>}
					</>
				) : (
					!searchState.isLoading && <li className={styles.noResults}>Không tìm thấy sản phẩm nào</li>
				)}
			</ul>
		</>
	);
}

export default HeaderSearchBar;
