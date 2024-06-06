import { MongoClient } from "mongodb";

const URI = 'mongodb://localhost:27017';
const DB_NAME = '';
const client = new MongoClient(URI);

const measureExecutionTime = async (label: string, operation: () => Promise<any>) => {
  const start = process.hrtime();
  const result = await operation();
  const end = process.hrtime(start);
  console.log(`${label} - execution time: ${end[0]}s ${end[1] / 1000000}ms`);

  return result;
};

async function findOne(db: string, collection: string, query: object) {
  try {
    return await client
      .db(db)
      .collection(collection)
      .findOne(query);
  } catch (err) {
    console.log('>>> ERROR: ' + err)
    return null;
  }
}

async function find(db: string, collection: string, query: object) {
  try {
    return client
      .db(db)
      .collection(collection)
      .find(query);
  } catch (err) {
    console.log('>>> ERROR: ' + err)
    return null;
  }
}

async function create(db: string, collection: string, query: object) {
  try {
    return await client
      .db(db)
      .collection(collection)
      .findOne(query);
  } catch (err) {
    console.log('>>> ERROR: ' + err)
    return null;
  }
}

async function exec() {
  await measureExecutionTime(
    '>>> contracts-embedded: findOne',
    () => findOne('contracts-embedded', 'contracts', { "attachments.company": 'HERTZ' })
  )

  await measureExecutionTime(
    '>>> contracts-embedded: find',
    () => find('contracts-embedded', 'contracts', { "attachments.company": 'HERTZ' })
  )

  await measureExecutionTime(
    '>>> contracts-embedded: create',
    () => findOne('contracts-embedded', 'contracts', { "attachments.company": 'HERTZ' })
  )
  // console.log(contract._id)

}

exec()
