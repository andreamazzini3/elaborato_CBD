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

async function aggregate(db: string, collection: string, pipeline: object[]) {
  try {
    return client
      .db(db)
      .collection(collection)
      .aggregate(pipeline)
      .toArray()
  } catch (err) {
    console.log('>>> ERROR: ' + err)
    return null;
  }
}

async function findOne(db: string, collection: string, query: object) {
  try {
    return client
      .db(db)
      .collection(collection)
      .findOne(query);
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
  // find all repairshop with hertz contract
  const contract = await measureExecutionTime(
    '>>> contracts-embedded: findOne',
    () => aggregate('contracts-embedded', 'contracts', [
      {
        $unwind: {
          path: "$attachments"
        }
      },
      {
        $group: {
          _id: "$attachments._id",
          company: { $first: '$attachments.company' },
          repair_shop_name: { $first: '$repair_shop_name' },
          repair_shop_p_iva: { $first: '$repair_shop_p_iva' },
        }
      },
      {
        $match: {
          "company": "HERTZ"
        }
      }
    ])
  )

  const contract_ref = await measureExecutionTime(
    '>>> contracts-ref: findOne',
    () => aggregate('contracts-referencing', 'contracts',
      [
        {
          $lookup: {
            from: "attachments-contracts",
            localField: "attachments",
            foreignField: "_id",
            as: "attachments"
          }
        },
        {
          $unwind: {
            path: "$attachments"
          }
        },
        {
          $group: {
            _id: "$attachments._id",
            company: { $first: "$attachments.company" },
            repair_shop_name: {
              $first: "$repair_shop_name"
            },
            repair_shop_p_iva: {
              $first: "$repair_shop_p_iva"
            }
          }
        },
        {
          $match: {
            'company': 'HERTZ'
          }
        }
      ]
    )
  )




  console.log(contract[0])

}

exec()
