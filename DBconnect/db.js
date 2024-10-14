import { MongoClient } from 'mongodb';


class DB {
  constructor() {
    this.client = new MongoClient('mongodb+srv://shimitamiroz:shimitamiroz@shopdb.hqf0u.mongodb.net/');
    this.database = this.client.db('ShopDB');
    this.connector = this.connect()
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected successfully to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
    }
  }

  async new_collection(name) {
    console.log('Start creating collection');
    try {
      const collection = await this.database.createCollection(name);
      console.log(`Collection created: ${name}`);
      return collection;
    } catch (error) {
      console.error(`Failed to create collection ${name}`, error);
    }
  }
  async add_doc(item_json, collection_name) {
    console.log('Start adding document');
    try {
      const collection = this.database.collection(collection_name);
      const result = await collection.insertOne(item_json);
      console.log('Finished adding document', result.insertedId);
      return result;
    } catch (error) {
      console.error('Failed to add document', error);
      throw error;
    }
  }
  async get_hash_from_user(user_name, collection_name){
    try{
      const document = await this.database.collection(collection_name).findOne({username : user_name})
      if (!document) {
        console.log(`User ${user_name} not found`);
        return null;
      }
      return document.hash;
    }catch(error){
      console.error('Failed to find document', error);
      throw error;
    }
  }

  async get_user_doc(user_name, collection_name){
    try{
      const document = await this.database.collection(collection_name).findOne({username : user_name})
      if (!document) {
        console.log(`User ${user_name} not found`);
        return null;
      }
      return document.username;
    }catch(error){
      console.error('Failed to find document', error);
      throw error;
    }
  }

  
  close() {
    this.client.close();
    console.log("Connection to MongoDB closed");
  }
}


export default DB;



