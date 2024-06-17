import {
  client,
  measureExecutionTime,
  contract_emb_label,
  contract_ref_label,
  FgCyan,
  Reset
} from '../common/shared';

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

async function find(db: string, collection: string, query: object, options?: object) {
  try {
    return await client
      .db(db)
      .collection(collection)
      .find(query, options)
      .toArray();
  } catch (err) {
    console.log('>>> ERROR: ' + err)
    return null;
  }
}

async function findAllPagination(db: string, collection: string, skip: number, limit: number) {
  try {
    return await client
      .db(db)
      .collection(collection)
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();
  } catch (err) {
    console.log('>>> ERROR: ' + err);
  }
}


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
    },
  }
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
            company: "HERTZ"
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



export async function exec() {
  await measureExecutionTime(
    contract_emb_label + ': optimize aggregate',
    () => aggregate('contracts-embedded', 'contracts', optimize_pipeline)
  )
  await measureExecutionTime(
    contract_emb_label + ': solw aggregate',
    () => aggregate('contracts-embedded', 'contracts', slow_pipeline)
  )

  await measureExecutionTime(
    contract_ref_label + ': optimize aggregate',
    () => aggregate('contracts-referencing', 'general-contracts', optimize_pipeline_ref)
  )
  await measureExecutionTime(
    contract_ref_label + ': optimize aggregate',
    () => aggregate('contracts-referencing', 'general-contracts', [lookup_aggregate, ...optimize_pipeline])
  )
  await measureExecutionTime(
    contract_ref_label + ': slow aggregate',
    () => aggregate('contracts-referencing', 'general-contracts', [lookup_aggregate, ...slow_pipeline])
  )

  await measureExecutionTime(
    contract_emb_label + ': find with projection and limit',
    () => find('contracts-embedded', 'contracts', {}, { projection: { attachments: 0 }, limit: 1000 })
  )
  await measureExecutionTime(
    contract_emb_label + ': find with limit',
    () => find('contracts-embedded', 'contracts', {}, { limit: 1000 })
  )
  await measureExecutionTime(
    contract_emb_label + ': findAll',
    () => find('contracts-embedded', 'contracts', {})
  )

  console.log(contract_emb_label + ': findAll with paging ...');
  await measureExecutionTime(
    contract_emb_label + ': findAll paging ',
    async () => {
      const page_lentgh = 300
      let documents: object[] = []
      for (let count = 0; count < 15000; count += page_lentgh) {
        let doc = await measureExecutionTime(
          FgCyan + '   ⤷ page: ' + Reset + count,
          () => findAllPagination('contracts-embedded', 'contracts', count, page_lentgh)
        )

        documents = [...documents, ...doc]
      }

      console.log(FgCyan + '   ⤷ doc_lenght: ' + Reset + documents.length)
    }
  )

}