"use client";

import React from "react";
import styles from "@/app/(pages)/products/Products.module.scss";
import ProductsTopSearch from "./ProductsTopSearch";
import ProductsTopFilter from "./ProductsTopFilter";

function ProductsTop() {
	return (
		<div className={styles.top}>
			<ProductsTopSearch />
			<ProductsTopFilter />
		</div>
	);
}

export default ProductsTop;
