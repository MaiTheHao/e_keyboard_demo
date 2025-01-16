import ItemGrid from "@/app/ui/components/pages/products/ItemGrid";
import ItemGridSkeleton from "@/app/ui/components/pages/products/ItemGridSkeleton";
import React, { Suspense } from "react";

async function Products() {
	return (
		<>
			<Suspense fallback={<ItemGridSkeleton />}>
				<ItemGrid />
			</Suspense>
		</>
	);
}

export default Products;
