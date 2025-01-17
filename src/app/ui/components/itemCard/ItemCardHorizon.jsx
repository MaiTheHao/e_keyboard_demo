'use client'
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styles from "./ItemCard.module.scss";
import NullImage from "./NullImage";
import Link from "next/link";

function ItemCardHorizon({ product }) {
	const itemHref = `/product/${product.id}`;
	const locale = product.currency === "VND" ? "vi-VN" : "en-US";
	return (
		<Link href={itemHref} className={`${styles.container} ${styles.ItemCardHorizon} card`}>
			<div className={styles.image}>
				{product.src ? <Image src={product.src} alt={`Ảnh sản phẩm: ${product.name}`} fill /> : <NullImage />}
			</div>
			<div className={styles.details}>
				<h1 className={styles.name}>{product.name}</h1>
				<p className={styles.description}>{product.description}</p>
				<h1 className={styles.price}>
					{product.price.toLocaleString(locale)}
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
