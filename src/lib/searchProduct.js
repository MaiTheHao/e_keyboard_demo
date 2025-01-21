'use server'

import normalize from "@/utils/normalize";
import { getProductsByQuery } from "./fetchProduct";

export async function searchByTerm(name, limit = 5, skip = 0) {
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

    const response = await getProductsByQuery(query, limit, skip);
    return response;
}