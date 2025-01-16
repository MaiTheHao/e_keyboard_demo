import React from "react";
import styles from "./Products.module.scss";
import ProductsTop from "@/app/ui/components/pages/products/Top/ProductsTop";

function layout({ children }) {
	return (
		<div className={styles.container}>
			<ProductsTop/>
			<div className={styles.body}>
				{children}
			</div>
		</div>
	);
}

export default layout;
