import { MongoClient } from 'mongodb';

export async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }

 export async function executeDriverCrudOperations() {
    const uri = process.env.DB_URI;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('sobekdb');
        const collection = db.collection('drivers');
        // console.log('CREATE Driver');
        // await createDriverDocument(collection);
        console.log(await findDriversByName(collection, 'John Smith'));
 
        // console.log('UPDATE Driver\'s Birthdate');
        // await updateDriversByName(collection, 'John Smith', { birthdate: new Date(2001, 5, 5) });
        // console.log(await findDriversByName(collection, 'John Smith'));
 
        // console.log('DELETE Driver');
        // await deleteDriversByName(collection, 'John Smith');
        // console.log(await findDriversByName(collection, 'John Smith'));
    } finally {
        await mongoClient.close();
    }
 }


 export async function createDriverDocument(collection) {
    const driverDocument = {
        name: 'John Smith',
        birthdate: new Date(2000, 11, 20),
        address: { street: 'Pike Lane', city: 'Los Angeles', state: 'CA' },
    };
 
    await collection.insertOne(driverDocument);
 }
 export async function findDriversByName(collection, name) {
    return collection.find({ name }).toArray();
 }
 export async function updateDriversByName(collection, name, updatedFields) {
    await collection.updateMany(
        { name },
        { $set: updatedFields }
    );
 }
 export async function deleteDriversByName(collection, name) {
    await collection.deleteMany({ name });
 }