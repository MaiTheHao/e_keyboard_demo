import ItemGrid from "@/app/ui/components/pages/products/ItemGrid";
import ItemGridSkeleton from "@/app/ui/components/pages/products/ItemGridSkeleton";
import React, { Suspense } from "react";

export const metadata = {
	title: "Products",
	description: "Tất cả sản phẩm có sẵn trong cửa hàng của chúng tôi"
};

async function Products({searchParams}) {
	const { filters } = await searchParams;
	return (
		<>
			<Suspense fallback={<ItemGridSkeleton />}>
				<ItemGrid/>
			</Suspense>
		</>
	);
}

export default Products;
