'use client';
import React, { useState, useEffect } from 'react';
import styles from './ItemGrid.module.scss';
import ItemCard from '../../itemCard/ItemCardVertical';
import ItemGridSkeleton from './ItemGridSkeleton';
import { getProductsByQuery } from '@/lib/fetchProduct';
import useProductsContext from '@/contexts/products/useProductsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const generateQuery = (filter, sort) => {
	const newFilterQuery = filter
		? Object.entries(filter).reduce((ac, [key, value]) => {
				if (!value) return ac;
				if (Array.isArray(value) && value.length === 0) return ac;
				ac[key] = Array.isArray(value) ? { $in: value } : value;
				return ac;
			}, {})
		: {};
	const newSortQuery = sort || null;

	const newQuery = { filter: newFilterQuery, sorter: newSortQuery };
	return newQuery;
};

const loadProducts = async (query, maxPerPage) => {
	let response;

	if (query.sorter?.customOrder) {
		response = await getProductsByQuery(query.filter, maxPerPage + 1, 0, {
			customOrder: query.sorter.customOrder,
			field: query.sorter.field,
		});
	} else {
		const sortOption = query.sorter?.mongoSort || { _id: -1 };
		response = await getProductsByQuery(query.filter, maxPerPage + 1, 0, sortOption);
	}

	return response;
};

function ItemGrid({ initProps = { products: [], ableToLoadMore: false }, maxPerPage = 15 }) {
	const [query, setQuery] = useState({ filter: {}, sorter: null });
	const [products, setProducts] = useState(initProps.products);
	const [isPending, setIsPending] = useState({ loadItems: false, loadMore: false });
	const [ableToLoadMore, setAbleToLoadMore] = useState(initProps.ableToLoadMore);
	const { filter, sort } = useProductsContext();

	const handleLoadMore = async () => {
		if (isPending.loadMore || !ableToLoadMore) return;
		setIsPending((prev) => ({ ...prev, loadMore: true }));

		const sortOption = query.sorter?.customOrder
			? { customOrder: query.sorter.customOrder, field: query.sorter.field }
			: query.sorter?.mongoSort;

		const response = await getProductsByQuery(
			query.filter,
			maxPerPage + 1,
			products.length,
			sortOption,
		);

		setAbleToLoadMore(response.length > maxPerPage);
		setProducts((prev) => [...prev, ...response.slice(0, maxPerPage)]);
		setIsPending((prev) => ({ ...prev, loadMore: false }));
	};

	useEffect(() => {
		const newQuery = generateQuery(filter, sort);
		if (JSON.stringify(newQuery) !== JSON.stringify(query)) {
			setQuery(newQuery);
			setIsPending({ ...isPending, loadItems: true });
		}
	}, [filter, sort]);

	useEffect(() => {
		if (isPending.loadItems) {
			loadProducts(query, maxPerPage).then((response) => {
				setAbleToLoadMore(response.length > maxPerPage);
				setProducts(response.slice(0, maxPerPage));
				setIsPending({ ...isPending, loadItems: false });
			});
		}
	}, [query, maxPerPage, isPending.loadItems]);

	if (isPending.loadItems) {
		return <ItemGridSkeleton />;
	}

	return (
		<>
			<div className={styles.gridItems}>
				{products.map((product) => (
					<ItemCard key={`product_id_${product?.id}`} product={product} />
				))}
			</div>
			{(ableToLoadMore && (
				<div className={styles.loadMore}>
					{isPending.loadMore && (
						<span style={{ color: 'var(--third-text)' }}>
							<FontAwesomeIcon icon={faSpinner} spin /> Đang tải...
						</span>
					)}
					{!isPending.loadMore && (
						<button onClick={() => handleLoadMore()}>Xem thêm sản phẩm</button>
					)}
				</div>
			)) || (
				<div className={styles.noMore}>
					<p>Không còn sản phẩm nào</p>
				</div>
			)}
		</>
	);
}

export default ItemGrid;
