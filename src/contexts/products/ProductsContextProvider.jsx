'use client'
import { useState } from "react";
import ProductsContext from "./ProductsContext";

export default function ProductsContextProvider({ children }) {
    const [filter, setFilter] = useState({
        brand: [],
        layout: [],
        caseMaterial: [],
        collabTheme: [],
        rgbBacklit: null,
        hotswap: null,
        switchType: [],
        rappodTrigger: null,
        tag: [],
    });
    const handleSetFilter = (setup) => {
        const updatedSetup = { ...setup };
        setFilter({ ...filter, ...updatedSetup });
    }

    const values = {
        filter,
        handleSetFilter
    }
	return <ProductsContext.Provider value={values}>{children}</ProductsContext.Provider>;
}
