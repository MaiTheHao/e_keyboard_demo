"use server";
import { productsCollection } from "@/configs/mongoDBConfig";
import { ObjectId } from "mongodb";
import { validateProduct, serializeProducts, serializeProduct } from "@/models/product";

// CREATE
export async function createProduct(product) {
	if (!validateProduct(product)) return null;
	const productDoc = product.getData();
	const result = await productsCollection.insertOne(productDoc);
	return result.insertedId;
}

// READ
export async function getAllProducts(limit = 0, skip = 0) {
	const products = await productsCollection.find({}).sort({_id: -1}).skip(skip).limit(limit).toArray();
	const response = serializeProducts(products);
	return response;
}

export async function getProductById(id) {
	const product = await productsCollection.findOne({ _id: new ObjectId(id) });
	return product ? serializeProduct(product) : null;
}

export async function getProductsByQuery(query = {}, limit = 15, skip = 0, sort = { _id: -1 }) {
	const sanitizedQuery = Object.keys(query).length === 0 ? {} : query;
	const isCustomSort = Boolean(sort?.customOrder);
	const sortOrderStage = isCustomSort
		? {
				$addFields: {
					sortOrder: {
						$switch: {
							branches: Object.entries(sort.customOrder).map(([key, value]) => ({
								case: { $eq: [{ $toLower: `$${sort.field}` }, key.toLowerCase()] },
								then: value,
							})),
							default: 99,
						},
					},
				},
		  }
		: null;

	const pipeline = [
		{ $match: sanitizedQuery },
		...(isCustomSort ? [sortOrderStage, { $sort: { sortOrder: 1, _id: -1 } }] : []),
		{ $skip: skip },
		{ $limit: limit },
		...(isCustomSort ? [{ $project: { sortOrder: 0 } }] : []),
	];

	const products = isCustomSort
		? await productsCollection.aggregate(pipeline).toArray()
		: await productsCollection
				.find(sanitizedQuery)
				.sort({ ...sort, _id: -1 })
				.skip(skip)
				.limit(limit)
				.toArray();

	return serializeProducts(products);
}

export async function getProductByQuery(query = {}) {
	const product = await productsCollection.findOne(query);
	return product ? serializeProduct(product) : null;
}

// UPDATE
export async function updateProduct(product) {
	if (!validateProduct(product)) return false;
	const productData = product.getData();
	const result = await productsCollection.updateOne({ _id: new ObjectId(product.getId()) }, { $set: productData });
	return result.modifiedCount > 0;
}

// DELETE
export async function deleteProduct(id) {
	const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
	return result.deletedCount > 0;
}
