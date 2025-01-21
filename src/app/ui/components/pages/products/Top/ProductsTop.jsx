"use client";

import React from "react";
import styles from "@/app/(pages)/products/Products.module.scss";
import ProductsTopFilter from "./ProductsTopFilter";

function ProductsTop() {
	return (
		<div className={styles.top}>
			<ProductsTopFilter />
		</div>
	);
}

export default ProductsTop;
