import { MongoClient } from "mongodb";

const URI = 'mongodb://localhost:27017';
const client = new MongoClient(URI);

function performace_metrics() { }

function db(db_name: string) {
  try {
    const db = client.db(db_name);
    return db
  } catch (err) {
    console.log('>>> ERROR: ' + err)
    return null
  }
}

const db_emb = db('contracts-embedded')
const db_ref = db('contracts-referencing')


const general_contracts = db_emb.collection('contracts');
const repair_shop = async (city: string) => {
  const contracts = await general_contracts.findOne({repair_shop_city: city});
}
