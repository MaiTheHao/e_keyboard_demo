'use server';
import { productsCollection } from "@/configs/mongoDBConfig";
import { ObjectId } from "mongodb";
import { validateProduct, convertToProduct, convertToProducts } from "@/models/product";

// CREATE
export async function createProduct(product) {
	if (!validateProduct(product)) return null;
	const productDoc = product.getData();
	const result = await productsCollection.insertOne(productDoc);
	return result.insertedId;
}

// READ
export async function getAllProducts(limit = 0) {
	const products = await productsCollection.find({}).limit(limit).toArray();
	return convertToProducts(products);
}

export async function getProductById(id) {
	const product = await productsCollection.findOne({ _id: new ObjectId(id) });
	return product ? convertToProduct(product) : null;
}

export async function getProductsByQuery(query = {}, limit = 15, sort = { _id: -1 }) {
	const products = await productsCollection.find(query).limit(limit).sort(sort).toArray();
	return products ? convertToProducts(products) : null;
}

export async function getProductByQuery(query = {}) {
	const product = await productsCollection.findOne(query);
	return product ? convertToProduct(product) : null;
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
