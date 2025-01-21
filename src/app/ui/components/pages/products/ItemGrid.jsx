"use client";
import React, { useState, useEffect } from "react";
import styles from "./ItemGrid.module.scss";
import ItemCard from "../../itemCard/ItemCardVertical";
import ItemGridSkeleton from "./ItemGridSkeleton";
import { getAllProducts } from "@/lib/fetchProduct";
import useProductsContext from "@/contexts/products/useProductsContext";

function ItemGrid({ maxPerPage = 15 }) {
	const [products, setProducts] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const { filter, handleSetFilter } = useProductsContext();

	useEffect(() => {
		async function loadProducts() {
			const response = await getAllProducts(maxPerPage);
			console.log(response);
			setProducts(response);
			setIsPending(false);
		}
		loadProducts();
	}, []);

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
