import { client, measureExecutionTime, contract_emb_label, contract_ref_label, DB_EMB, DB_REF } from '../common/shared'
import { attachments, new_contract_ref, new_contracts } from '../common/data';

export async function create(db: string, collection: string, documents: object[]) {
  try {
    return await client
      .db(db)
      .collection(collection)
      .insertMany(documents);
  } catch (err) {
    console.log('>>> ERROR: ' + err)
    return null;
  }
}


export async function exec() {

  await measureExecutionTime(
    contract_emb_label + ': simple insertMany',
    () => create(DB_EMB.db, DB_EMB.collection, new_contracts)
  )

  await measureExecutionTime(
    contract_ref_label + ': simple insertMany',
    async () => {
      attachments.map(attachment => {
        new_contract_ref.map(contract => contract.attachments.push(attachment._id ? attachment._id : ''))
      })

      await create(DB_REF.db, DB_REF.collection_general, new_contract_ref)
      await create(DB_REF.db, DB_REF.collection_attachments, attachments)
    }
  )
}

