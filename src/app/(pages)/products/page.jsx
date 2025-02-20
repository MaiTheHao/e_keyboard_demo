import { PRODUCTS_PAGE_METADATA } from '../../../../constants';
import ItemGrid from '@/app/ui/components/pages/products/ItemGrid';
import { getAllProducts } from '@/lib/fetchProduct';
import React from 'react';

export const revalidate = 15; // Update lại initProps sau 15s
export const metadata = {
	...PRODUCTS_PAGE_METADATA,
};

const MAX_PER_PAGE = 15;
export default async function Products() {
	const initProducts = await getAllProducts(MAX_PER_PAGE + 1);
	const ableToloadMore = initProducts.length > MAX_PER_PAGE;

	const initProps = {
		products: initProducts.slice(0, MAX_PER_PAGE),
		ableToLoadMore: ableToloadMore,
	};
	return <ItemGrid initProps={initProps} maxPerPage={MAX_PER_PAGE} />;
}
