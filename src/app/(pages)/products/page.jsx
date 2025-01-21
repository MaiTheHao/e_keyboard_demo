import ItemGrid from "@/app/ui/components/pages/products/ItemGrid";
import React from "react";
import ProductsContextProvider from "@/contexts/products/ProductsContextProvider";

export const metadata = {
	title: "Products",
	description: "Tất cả sản phẩm có sẵn trong cửa hàng của chúng tôi"
};

const MAX_PER_PAGE = 20;

export default async function Products({ searchParams }) {
	return (
		<ProductsContextProvider>
			<ItemGrid maxPerPage={MAX_PER_PAGE} />
		</ProductsContextProvider>
	);
}
