"use client";
import React, { useState, useEffect } from "react";
import styles from "./ItemGrid.module.scss";
import ItemCard from "../../itemCard/ItemCardVertical";
import ItemGridSkeleton from "./ItemGridSkeleton";
import { getProductsByQuery } from "@/lib/fetchProduct";
import useProductsContext from "@/contexts/products/useProductsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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

function ItemGrid({ initProps = { products: [], ableToLoadMore: false }, maxPerPage = 15 }) {
	const [query, setQuery] = useState({});
	const [products, setProducts] = useState(initProps.products);
	const [isPending, setIsPending] = useState({ loadItems: false, loadMore: false });
	const [ableToLoadMore, setAbleToLoadMore] = useState(initProps.ableToLoadMore);
	const { filter, sort } = useProductsContext();

	const handleLoadMore = async () => {
		if (isPending.loadMore || !ableToLoadMore) return;
		setIsPending((prev) => ({ ...prev, loadMore: true }));

		const sortOption = sort?.customOrder
			? { customOrder: sort.customOrder, field: sort.field }
			: sort?.mongoSort || { _id: -1 };
		const response = await getProductsByQuery(query, maxPerPage + 1, products.length, sortOption);

		setAbleToLoadMore(response.length > maxPerPage);
		setProducts((prev) => [...prev, ...response.slice(0, maxPerPage)]);
		setIsPending((prev) => ({ ...prev, loadMore: false }));
	};

	useEffect(() => {
		const newQuery = generateQuery(filter);
		if (JSON.stringify(newQuery) !== JSON.stringify(query)) {
			setQuery(newQuery);
			setIsPending({ ...isPending, loadItems: true });
		}
	}, [filter]);

	useEffect(() => {
		if (isPending.loadItems) {
			loadProducts(query, sort, maxPerPage).then((response) => {
				setAbleToLoadMore(response.length > maxPerPage);
				setProducts(response.slice(0, maxPerPage));
				setIsPending({ ...isPending, loadItems: false });
			});
		}
	}, [query, sort, maxPerPage, isPending.loadItems]);

	if (isPending.loadItems) {
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
					{isPending.loadMore && <span style={{ color: "var(--third-text)" }}><FontAwesomeIcon icon={faSpinner} spin /> Đang tải...</span>}
					{!isPending.loadMore && <button onClick={() => handleLoadMore()}>Xem thêm sản phẩm</button>}
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
