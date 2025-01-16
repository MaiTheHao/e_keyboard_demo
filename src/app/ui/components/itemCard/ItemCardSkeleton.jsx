import React from "react";
import styles from "./ItemCard.module.scss";

function ItemCardSkeleton() {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.skeImage}`}></div>
            <div className={styles.skeDetails}>
                <div className={`${styles.skeName}`}></div>
                <div className={`${styles.skeDescription}`}></div>
                <div className={`${styles.skePrice}`}></div>
            </div>
        </div>
    );
}

export default ItemCardSkeleton;
