import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styles from "./ItemCard.module.scss";
import LinkBtn from "../button/LinkBtn";
import { faEye, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import NullImage from "./NullImage";
import Product, { validateProduct } from "@/models/product";

function ItemCard({ product }) {
	if (!validateProduct(product)) return null;

	const itemHref = `/product/${product.getId()}`;
	const locale = product.currency === "VND" ? "vi-VN" : "en-US";
	return (
		<div className={`${styles.container} card`}>
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

ItemCard.propTypes = {
	product: PropTypes.instanceOf(Product).isRequired,
};

export default ItemCard;
