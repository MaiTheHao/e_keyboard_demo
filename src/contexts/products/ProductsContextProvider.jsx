"use client";
import { useState } from "react";
import ProductsContext from "./ProductsContext";
import { FILTER_FIELDS_OPTIONS } from "@/app/constants";
import { inferFilterDataTypes } from "@/utils/filter";

export default function ProductsContextProvider({ children }) {
    const initialFilters = inferFilterDataTypes(FILTER_FIELDS_OPTIONS);
    const [filter, setFilter] = useState(initialFilters);
    const [sort, setSort] = useState(null);

    const handleSetFilter = (setup) => {
        const updatedSetup = { ...setup };
        setFilter((prevFilter) => ({ ...prevFilter, ...updatedSetup }));
    };

    const values = {
        filterFieldsOptions: FILTER_FIELDS_OPTIONS,
        filter,
		initialFilters,
        handleSetFilter,
        sort,
        setSort,
    };

    return <ProductsContext.Provider value={values}>{children}</ProductsContext.Provider>;
}