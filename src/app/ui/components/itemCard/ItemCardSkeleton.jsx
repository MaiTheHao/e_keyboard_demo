import React from "react";
import styles from "./ItemCard.module.scss";

function ItemCardSkeleton() {
	return (
		<div className={`${styles.container} card`}>
			<div className={`${styles.image} ${styles.skeleton}`} />
			<div className={`${styles.details} ${styles.skeleton}`}>
				<h1 className={styles.name} />
				<p className={styles.description} />
				<h1 className={styles.price} />
			</div>
		</div>
	);
}

export default ItemCardSkeleton;
