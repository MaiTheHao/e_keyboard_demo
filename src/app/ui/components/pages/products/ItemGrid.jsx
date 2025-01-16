import React from "react";
import styles from "./ItemGrid.module.scss";
import { getAllProducts } from "@/models/product";
import ItemCard from "../../itemCard/ItemCard";

async function ItemGrid() {
	const products = await getAllProducts();
	return (
		<div className={styles.gridItems}>
			{products.map((product) => (
				<ItemCard
					key={`product_id_${product?.id}`}
					product={product}
				/>
			))}
		</div>
	);
}

export default ItemGrid;
