import { PRODUCTS_PAGE_METADATA } from "@/app/constants";
import ItemGrid from "@/app/ui/components/pages/products/ItemGrid";
import React from "react";

export const metadata = {
	...PRODUCTS_PAGE_METADATA
};

const MAX_PER_PAGE = 1000;
export default function Products() {
	return <ItemGrid maxPerPage={MAX_PER_PAGE} />;
}
