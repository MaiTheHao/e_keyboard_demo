"use client";
import React, { useState, useEffect } from "react";
import styles from "./ItemGrid.module.scss";
import ItemCard from "../../itemCard/ItemCardVertical";
import ItemGridSkeleton from "./ItemGridSkeleton";
import { getProductsByQuery } from "@/lib/fetchProduct";
import useProductsContext from "@/contexts/products/useProductsContext";

function ItemGrid({ maxPerPage = 15 }) {
	const [query, setQuery] = useState({});
	const [products, setProducts] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const [ableToLoadMore, setAbleToLoadMore] = useState(true);
	const { filter } = useProductsContext();

	const handleLoadMore = async () => {
		const response = await getProductsByQuery(query, maxPerPage + 1, products.length);
		setAbleToLoadMore(response.length > maxPerPage);
		setProducts([ ...products, ...response.slice(0, maxPerPage) ]);
		setIsPending(false);
	};

	useEffect(() => {
		async function loadProducts() {
			const newQuery = filter
				? Object.entries(filter).reduce((acc, [key, value]) => {
						if (!value) return acc;
						if (Array.isArray(value) && value.length === 0) return acc;
						acc[key] = Array.isArray(value) ? { $in: value } : value;
						return acc;
				  }, {})
				: {};

			const response = await getProductsByQuery(newQuery, maxPerPage + 1);
			setAbleToLoadMore(response.length > maxPerPage);
			setProducts(response.slice(0, maxPerPage));
			setQuery(newQuery);
			setIsPending(false);
		}
		loadProducts();
	}, [filter]);

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
			{ableToLoadMore && (
				<div className={styles.loadMore}>
					<button onClick={() => handleLoadMore()}>Xem thêm sản phẩm</button>
				</div>
			)
			||
			<div className={styles.noMore}>
				<p>Không còn sản phẩm nào</p>
			</div>
			}
		</>
	);
}

export default ItemGrid;
