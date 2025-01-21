import ItemGrid from "@/app/ui/components/pages/products/ItemGrid";
import React from "react";

export const metadata = {
	title: "Products",
	description: "Tất cả sản phẩm có sẵn trong cửa hàng của chúng tôi",
};

const MAX_PER_PAGE = 1000;
export default function Products() {
	return <ItemGrid maxPerPage={MAX_PER_PAGE} />;
}
