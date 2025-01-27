import { getProductById } from "@/lib/fetchProduct";
import React from "react";

async function ProductShow({ id }) {
    const product = await getProductById(id);
	return <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
    </div>
}

export default ProductShow;
