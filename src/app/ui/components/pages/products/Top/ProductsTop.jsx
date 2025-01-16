"use client";

import React from "react";
import Search from "./ProductsTopSearch";
import styles from "@/app/(pages)/products/Products.module.scss";

function ProductsTop() {
	return (
		<div className={styles.top}>
			<Search />
		</div>
	);
}

export default ProductsTop;
