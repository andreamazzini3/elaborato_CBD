import { MongoClient } from "mongodb";

const URI = 'mongodb://localhost:27017';
const client = new MongoClient(URI);

const FgYellow = "\x1b[33m";
const FgCyan = "\x1b[36m"
const Reset = "\x1b[0m"
const contract_ref_label = FgYellow + '⇒ contracts-ref' + Reset
const contract_emb_label = FgCyan + '↪ contracts-emb' + Reset

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
  const slow_pipeline = [
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
        company: "HERTZ"
      }
    }
  ]

  const optimize_pipeline = [
    {
      $unwind: {
        path: "$attachments"
      }
    },
    {
      $project: {
        _id: "$attachments._id",
        company: "$attachments.company",
        repair_shop_name: "$repair_shop_name",
        repair_shop_p_iva: "$repair_shop_p_iva"
      }
    },
    {
      $match: {
        company: "HERTZ"
      }
    },
  ]

  const optimize_pipeline_ref = [
    {
      $lookup: {
        from: "attachments-contracts",
        as: "attachments",
        localField: "attachments",
        foreignField: "_id",
        pipeline: [
          {
            $match: {
              company: {
                $eq: "HERTZ"
              }
            }
          }
        ]
      }
    },
    {
      $unwind: {
        path: "$attachments"
      }
    },
    {
      $project: {
        _id: "$attachments._id",
        company: "$attachments.company",
        repair_shop_name: "$repair_shop_name",
        repair_shop_p_iva: "$repair_shop_p_iva",
        data: "$contract_date_signature"
      }
    },

  ]

  const lookup_aggregate = {
    $lookup: {
      from: "attachments-contracts",
      localField: "attachments",
      foreignField: "_id",
      as: "attachments"
    }
  }

  // find all repairshop with hertz contract
  // const contract_emb_optmized = await measureExecutionTime(
  //   contract_emb_label + ': optimize aggregate',
  //   () => aggregate('contracts-embedded', 'contracts', optimize_pipeline)
  // )
  // const contract_emb_slow = await measureExecutionTime(
  //   contract_emb_label + ': optimize aggregate',
  //   () => aggregate('contracts-embedded', 'contracts', slow_pipeline)
  // )

  const contract_ref_optmized_2 = await measureExecutionTime(
    contract_ref_label + ': optimize aggregate',
    () => aggregate('contracts-referencing', 'general-contracts', optimize_pipeline_ref)
  )
  const contract_ref_optmized = await measureExecutionTime(
    contract_ref_label + ': optimize aggregate',
    () => aggregate('contracts-referencing', 'general-contracts', [lookup_aggregate, ...optimize_pipeline])
  )
  const contract_ref_slow = await measureExecutionTime(
    contract_ref_label + ': optimize aggregate',
    () => aggregate('contracts-referencing', 'general-contracts', [lookup_aggregate, ...slow_pipeline])
  )

}

console.log(' ')
exec()
