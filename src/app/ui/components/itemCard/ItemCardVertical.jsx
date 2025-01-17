'use client'
import React from "react";
import PropTypes, { object } from "prop-types";
import Image from "next/image";
import styles from "./ItemCard.module.scss";
import LinkBtn from "../button/LinkBtn";
import { faEye, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import NullImage from "./NullImage";

function ItemCardVertical({ product }) {
	const itemHref = `/product/${product.id}`;
	const locale = product.currency === "VND" ? "vi-VN" : "en-US";
	return (
		<div className={`${styles.container} ${styles.ItemCardVertical} card`}>
			<div className={styles.image}>
				{product.src ? <Image src={product.src} alt={`Ảnh sản phẩm: ${product.name}`} fill /> : <NullImage />}
				<div className={styles.popupHoverContainer}>
					<div className={styles.popupHoverBlock}>
						<LinkBtn href={itemHref} text="Xem chi tiết" icon={faEye} />
						<LinkBtn href="/cart" text="Thêm vào giỏ hàng" icon={faCartShopping} />
					</div>
				</div>
			</div>
			<div className={styles.details}>
				<h1 className={styles.name}>{product.name}</h1>
				<p className={styles.description}>{product.description}</p>
				<h1 className={styles.price}>
					{product.price.toLocaleString(locale)}
					<span>{product.currency}</span>
				</h1>
			</div>
		</div>
	);
}

ItemCardVertical.propTypes = {
	product: PropTypes.object.isRequired,
};

export default ItemCardVertical;
