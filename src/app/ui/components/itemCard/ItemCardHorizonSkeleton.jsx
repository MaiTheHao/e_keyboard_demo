import React from "react";
import styles from "./ItemCard.module.scss";

function ItemCardHorizonSkeleton() {
	return (
		<div className={`${styles.container} ${styles.ItemCardHorizon} ${styles.skeleton} card`}>
			<div className={`${styles.image} `} />
			<div className={`${styles.details}`}>
				<h1 className={styles.name} />
				<p className={styles.description} />
				<h1 className={styles.price} />
			</div>
		</div>
	);
}

export default ItemCardHorizonSkeleton;
