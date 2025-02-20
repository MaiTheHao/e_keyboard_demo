'use client';
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from './ItemCard.module.scss';
import NullImage from './NullImage';
import Link from 'next/link';
import { ITEM_CARD_NAVIGATE_PATH } from '../../../../../constants';
import { generateCurrencyString } from '@/utils/text';

function ItemCardHorizon({ product }) {
	const itemHref = `${ITEM_CARD_NAVIGATE_PATH}/${product.id}`;
	return (
		<Link href={itemHref} className={`${styles.container} ${styles.ItemCardHorizon} card`}>
			<div className={styles.image}>
				{product.src ? (
					<Image
						src={product.src}
						alt={`Ảnh sản phẩm: ${product.name}`}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						priority
					/>
				) : (
					<NullImage />
				)}
			</div>
			<div className={styles.details}>
				<h1 className={styles.name}>{product.name}</h1>
				<p className={styles.description}>{product.description}</p>
				<h1 className={styles.price}>
					{generateCurrencyString(product.price, product.currency)}
					<span>{product.currency}</span>
				</h1>
			</div>
		</Link>
	);
}

ItemCardHorizon.propTypes = {
	product: PropTypes.object.isRequired,
};

export default ItemCardHorizon;
