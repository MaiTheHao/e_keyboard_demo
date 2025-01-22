import React from "react";
import styles from "./Products.module.scss";
import ProductsTop from "@/app/ui/components/pages/products/productsTop/ProductsTop";
import ProductsContextProvider from "@/contexts/products/ProductsContextProvider";

function layout({ children }) {
	return (
		<ProductsContextProvider>
			<div className={styles.container}>
				<ProductsTop/>
				<div className={styles.body}>
					{children}
				</div>
			</div>
		</ProductsContextProvider>
	);
}

export default layout;
