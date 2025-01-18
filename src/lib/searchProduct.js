'use server'

import normalize from "@/utils/normalize";
import { getProductsByQuery } from "./fetchProduct";
const { serializeProducts } = require("@/models/product");

export async function searchByName(name, limit = 5) {
    name = normalize(name);
    const searchTerms = name.split(/\s+/).filter(term => term.length > 0);
    const searchFields = [
        'name', 'category', 'brand', 'layout', 'caseMaterial',
        'collabTheme', 'switchType', 'model', 'series'
    ];

    const query = {
        $and: searchTerms.map(term => ({
            $or: searchFields.map(field => ({
                [field]: { $regex: term, $options: "i" }
            }))
        }))
    };

    const products = await getProductsByQuery(query, limit);
    return serializeProducts(products);
}