import React from "react";
import styles from "./ItemGrid.module.scss";
import ItemCardVerticalSkeleton from "../../itemCard/ItemCardVerticalSkeleton";

function ItemGridSkeleton({count = 15}) {
    const skeletonItems = Array.from({ length: count });

    return (
        <div className={styles.gridItems}>
            {skeletonItems.map((_, index) => (
                <ItemCardVerticalSkeleton key={`ItemCardVerticalSkeleton-${index}`} />
            ))}
        </div>
    );
}

export default ItemGridSkeleton;
