const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://Users_web:WEB123@cluster0.f8m4h.mongodb.net/test';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';
//c'est une fonction assynchrone, C'est-à dire que les commandes écrits dans cette fonction sont exécutés de façon asynchrone et on ne sait pas quand exactement
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  

  // the following code examples can be pasted here...

  //add three documents to the documents collection.
  //const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
  //console.log('Inserted documents =>', insertResult);

  //Add a query that returns all the documents.
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);
  
  //Find Documents with a Query Filter
  const filteredDocs = await collection.find({ a: 3 }).toArray();
  console.log('Found documents filtered by { a: 3 } =>', filteredDocs);

  //The method updates the first document where the field a is equal to 3 by adding a new field b to the document set to 1. updateResult contains information about whether there was a matching document to update or not.
  //const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
  //console.log('Updated documents =>', updateResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
