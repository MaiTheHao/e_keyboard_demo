'use client';
import React, { useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import Image from 'next/image';
import styles from './ItemCard.module.scss';
import LinkBtn from '../button/LinkBtn';
import { faEye, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import NullImage from './NullImage';
import { ITEM_CARD_NAVIGATE_PATH } from '../../../../../constants';
import { generateCurrencyString } from '@/utils/text';
import Link from 'next/link';
import useScreenSizeContext from '@/contexts/ScreenSizeContext/useScreenSizeContext';

const CommonCard = ({ product, className, children }) => {
	return (
		<div className={`${styles.container} ${styles.ItemCardVertical} ${className} card`}>
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
				{children}
			</div>
			<div className={styles.details}>
				<h1 className={styles.name}>{product.name}</h1>
				<p className={styles.description}>{product.description}</p>
				<h1 className={styles.price}>
					{generateCurrencyString(product.price, product.currency)}
					<span>{product.currency}</span>
				</h1>
			</div>
		</div>
	);
};

const DesktopCard = (product, itemHref) => {
	return (
		<CommonCard product={product}>
			<div className={styles.popupHoverContainer}>
				<div className={styles.popupHoverBlock}>
					<LinkBtn href={itemHref} text='Xem chi tiết' icon={faEye} />
					<LinkBtn href='/cart' text='Thêm vào giỏ hàng' icon={faCartShopping} />
				</div>
			</div>
		</CommonCard>
	);
};

const MobileCard = (product, itemHref) => {
	return (
		<Link href={itemHref}>
			<CommonCard product={product} />
		</Link>
	);
};

function ItemCardVertical({ product }) {
	const { isDesktop } = useScreenSizeContext();

	const itemHref = `${ITEM_CARD_NAVIGATE_PATH}/${product.id}`;
	return isDesktop ? DesktopCard(product, itemHref) : MobileCard(product, itemHref);
}

ItemCardVertical.propTypes = {
	product: PropTypes.object.isRequired,
};

export default ItemCardVertical;
