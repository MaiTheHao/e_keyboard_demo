"use client";
import React, { useState, useEffect } from "react";
import styles from "./ItemGrid.module.scss";
import ItemCard from "../../itemCard/ItemCardVertical";
import ItemGridSkeleton from "./ItemGridSkeleton";
import { getAllProducts, getProductsByQuery } from "@/lib/fetchProduct";
import useProductsContext from "@/contexts/products/useProductsContext";

function ItemGrid({ maxPerPage = 15 }) {
	const [products, setProducts] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const { filter } = useProductsContext();

	useEffect(() => {
		async function loadProducts() {
			const query = filter ? Object.entries(filter).reduce((acc, [key, value]) => {
				if (!value) return acc;
				if (Array.isArray(value) && value.length === 0) return acc;
				acc[key] = Array.isArray(value) ? { $in: value } : value;
				return acc;
			}, {}) : {};

			const response = await getProductsByQuery(query, maxPerPage);
			console.log(response);
			setProducts(response);
			setIsPending(false);
		}
		loadProducts();
	}, [filter]);

	if (isPending) {
		return <ItemGridSkeleton />;
	}

	return (
		<div className={styles.gridItems}>
			{products.map((product) => (
				<ItemCard key={`product_id_${product?.id}`} product={product} />
			))}
		</div>
	);
}

export default ItemGrid;
