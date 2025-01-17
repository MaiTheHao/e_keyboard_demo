import React from "react";
import styles from "./ItemGrid.module.scss";
import { getAllProducts, serializeProduct } from "@/models/product";
import ItemCard from "../../itemCard/ItemCardVertical";

async function ItemGrid() {
	const products = await getAllProducts();
	return (
		<div className={styles.gridItems}>
			{products.map((product) => (
				<ItemCard
					key={`product_id_${product?.id}`}
					product={serializeProduct(product)}
				/>
			))}
		</div>
	);
}

export default ItemGrid;
