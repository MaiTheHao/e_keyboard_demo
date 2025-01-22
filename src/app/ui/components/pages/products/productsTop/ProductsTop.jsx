"use client";

import React from "react";
import styles from "@/app/(pages)/products/Products.module.scss";
import ProductsTopDataControl from "./ProductsTopDataControl";

function ProductsTop() {
	return (
		<div className={styles.top}>
			<ProductsTopDataControl />
		</div>
	);
}

export default ProductsTop;
