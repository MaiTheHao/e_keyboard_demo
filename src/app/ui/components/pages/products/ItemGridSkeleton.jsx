import React from "react";
import styles from "./ItemGrid.module.scss";
import ItemCardSkeleton from "../../itemCard/ItemCardSkeleton";

function ItemGridSkeleton({count = 15}) {
    const skeletonItems = Array.from({ length: count });

    return (
        <div className={styles.gridItems}>
            {skeletonItems.map((_, index) => (
                <ItemCardSkeleton key={`itemcardskeleton-${index}`} />
            ))}
        </div>
    );
}

export default ItemGridSkeleton;
