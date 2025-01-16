import { MongoClient } from 'mongodb';

// Lấy các biến môi trường cần thiết
const { DATABASE_URL, DATABASE_MAX_POOL_SIZE, DATABASE_NAME, DATABASE_PRODUCTS_COLLECTION, DATABASE_USERS_COLLECTION } = process.env;
if (!DATABASE_URL || !DATABASE_NAME || !DATABASE_PRODUCTS_COLLECTION || !DATABASE_USERS_COLLECTION) {
    throw new Error('Thiếu các biến môi trường bắt buộc: DATABASE_URL, DATABASE_NAME, DATABASE_PRODUCTS_COLLECTION, hoặc DATABASE_USERS_COLLECTION');
}

// Cấu hình kết nối tới MongoDB
const configs = {
    connect: {
        url: DATABASE_URL,
        options: {
            maxPoolSize: parseInt(DATABASE_MAX_POOL_SIZE, 10) || 10,
        },
    },
    dbName: DATABASE_NAME
};

// Kết nối tới MongoDB
let client;
let clientPromise;

if (!clientPromise) {
    client = new MongoClient(configs.connect.url, configs.connect.options);
    clientPromise = client.connect();
}

// Xác nhận kết nối
clientPromise.then(() => {
    console.log("\n_________________________________________________________________________________________");
    console.log('Đã kết nối tới MongoDB, chi tiết kết nối:');
    console.log(`URL: ${configs.connect.url}`);
    console.log(`Tùy chọn: ${JSON.stringify(configs.connect.options, null, 2)}`);
    console.log(`Tên cơ sở dữ liệu: ${configs.dbName}`);
    console.log(`Bộ sưu tập: ${[DATABASE_PRODUCTS_COLLECTION, DATABASE_USERS_COLLECTION].join(', ')}`);
    console.log("_________________________________________________________________________________________\n");
}).catch(err => {
    console.error('Kết nối tới MongoDB thất bại:', err);
});

// Chọn database và collections
const db = client.db(configs.dbName);
const productsCollection = db.collection(DATABASE_PRODUCTS_COLLECTION);
const usersCollection = db.collection(DATABASE_USERS_COLLECTION);

// Export các biến cần thiết
export default clientPromise;
export { productsCollection, usersCollection };