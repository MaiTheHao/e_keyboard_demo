"use client";
import { useContext } from "react";
import ProductsContext from "./ProductsContext";

export default function useProductsContext() {
	return useContext(ProductsContext);
}
