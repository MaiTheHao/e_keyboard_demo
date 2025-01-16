import { usersCollection } from "@/configs/mongoDBConfig";
import { ObjectId } from "mongodb";

function validateUser(user) {
	if (!user || typeof user !== "object") return false;
	if (!user.name || typeof user.name !== "string") return false;
	if (!user.age || typeof user.age !== "number") return false;
	if (!user.address || typeof user.address !== "object") return false;
	if (!user.address.path || typeof user.address.path !== "string") return false;
	if (!user.address.province || typeof user.address.province !== "string") return false;
	if (!user.role || !Array.isArray(user.role)) return false;
	return true;
}

export async function getUserById(id) {
	const user = await usersCollection.findOne({ _id: new ObjectId(id) });
	return user;
}

export async function updateUser(id, update) {
	const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: update });
	return result.modifiedCount > 0;
}

export async function deleteUser(id) {
	const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
	return result.deletedCount > 0;
}

export async function createUser(user) {
	if (!validateUser(user)) return null;
	const result = await usersCollection.insertOne(user);
	return result.insertedId;
}

/*

{
  _id: ObjectId('677c0f3947634eca03af015f'),
  name: 'Mai The Hao',
  age: 18,
  address: {
    path: 'To 1, Khu pho 8, Uyen Hung, Tan Uyen',
    province: 'Binh Duong'
  },
  role: [ 'student', 'resident' ]
}

*/
