"use client";
import React, { useState, useEffect } from "react";
import styles from "./ItemGrid.module.scss";
import ItemCard from "../../itemCard/ItemCardVertical";
import ItemGridSkeleton from "./ItemGridSkeleton";
import { getProductsByQuery } from "@/lib/fetchProduct";
import useProductsContext from "@/contexts/products/useProductsContext";

const generateQuery = (filter) => {
	const newQuery = filter
		? Object.entries(filter).reduce((ac, [key, value]) => {
				if (!value) return ac;
				if (Array.isArray(value) && value.length === 0) return ac;
				ac[key] = Array.isArray(value) ? { $in: value } : value;
				return ac;
		  }, {})
		: {};

	return newQuery;
};

const loadProducts = async (query, sort, maxPerPage) => {
	let response;
	if (sort?.customOrder) {
		response = await getProductsByQuery(query, maxPerPage + 1, 0, {
			customOrder: sort.customOrder,
			field: sort.field,
		});
	} else {
		const sortOption = sort?.mongoSort || { _id: -1 };
		response = await getProductsByQuery(query, maxPerPage + 1, 0, sortOption);
	}

	return response;
};

function ItemGrid({ maxPerPage = 15 }) {
	const [query, setQuery] = useState({});
	const [products, setProducts] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const [ableToLoadMore, setAbleToLoadMore] = useState(true);
	const { filter, sort } = useProductsContext();

	const handleLoadMore = async () => {
		let response;
		if (sort?.customOrder) {
			response = await getProductsByQuery(query, maxPerPage + 1, products.length, {
				customOrder: sort.customOrder,
				field: sort.field,
			});
		} else {
			const sortOption = sort?.mongoSort || { _id: -1 };
			response = await getProductsByQuery(query, maxPerPage + 1, products.length, sortOption);
		}

		setAbleToLoadMore(response.length > maxPerPage);
		setProducts([...products, ...response.slice(0, maxPerPage)]);
		setIsPending(false);
	};

	useEffect(() => {
		setQuery(generateQuery(filter));
		setIsPending(true);
	}, [filter]);

	useEffect(() => {
		loadProducts(query, sort, maxPerPage).then((response) => {
			setAbleToLoadMore(response.length > maxPerPage);
			setProducts(response.slice(0, maxPerPage));
			setIsPending(false);
		});
	}, [query, sort]);

	if (isPending) {
		return <ItemGridSkeleton />;
	}

	return (
		<>
			<div className={styles.gridItems}>
				{products.map((product) => (
					<ItemCard key={`product_id_${product?.id}`} product={product} />
				))}
			</div>
			{(ableToLoadMore && (
				<div className={styles.loadMore}>
					<button onClick={() => handleLoadMore()}>Xem thêm sản phẩm</button>
				</div>
			)) || (
				<div className={styles.noMore}>
					<p>Không còn sản phẩm nào</p>
				</div>
			)}
		</>
	);
}

export default ItemGrid;
