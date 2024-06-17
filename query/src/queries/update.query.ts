import { client, measureExecutionTime, contract_emb_label, contract_ref_label, DB_EMB, DB_REF } from '../common/shared';
import { create } from './create.query';
import { Attachment, attachments } from '../common/data';
import { ObjectId } from 'mongodb';

async function update(db: string, collection: string, filter: object, documents: object, options?: object) {
  try {
    return await client
      .db(db)
      .collection(collection)
      .updateMany(filter, documents, options)

  } catch (err) {
    console.log('>>> ERROR: ' + err);
  }
}

async function updateWithAggregate(db: string, collection: string, pipeline: object[]) {
  try {
    return await client
      .db(db)
      .collection(collection)
      .aggregate(pipeline)
      .toArray()

  } catch (err) {
    console.log('>>> ERROR: ' + err);
  }
}

export async function exec() {
  const contract_emb_id = '66616cda54ad5bafdce49017'
  const contract_ref_id = '6661778c54ad5bafdce4c8b4'
  let attachment = attachments[0]

  // ↓ clear data ↓
  await update(
    DB_EMB.db,
    DB_EMB.collection,
    { _id: new ObjectId(contract_emb_id) },
    { $set: { attachments: [] } }
  )
  await update(
    DB_REF.db,
    DB_REF.collection_general,
    { _id: new ObjectId(contract_ref_id) },
    { $set: { attachments: [] } }
  )

  // ↓ insert many attachemnts ↓ 
  console.log(contract_emb_label + ': insert Attachements')
  const new_attachment: Attachment[] = []
  for (let i = 0; i <= 2000; i += 200) {
    for (let count = 0; count < i; count++) {
      attachment.date_created = Date.now().toString();
      new_attachment.push(attachment)
    }

    await measureExecutionTime(
      '  ' + contract_emb_label + ': insert Attachements [ ' + i + ' ]',
      async () => {
        await update(
          DB_EMB.db,
          DB_EMB.collection,
          { _id: new ObjectId(contract_emb_id) },
          { $push: { attachments: { $each: new_attachment } } }
        )
      }
    )
  }

  console.log(contract_ref_label + ': insert Attachements')
  // new_attachment.length = 0
  // for (let i = 0; i <= 2000; i += 200) {
  //   for (let count = 0; count < i; count++) {
  //     attachment.date_created = Date.now().toString();
  //     attachment._id = (new ObjectId()).toString()
  //     // console.log(attachment._id)
  //     new_attachment.push(attachment)
  //   }

  //   await measureExecutionTime(
  //     '  ' + contract_ref_label + ': insert Attachements [ ' + i + ' ]',
  //     async () => {
  //       const attachment_ids = new_attachment.map(attachment => attachment._id)

  //       await create(
  //         DB_REF.db,
  //         DB_REF.collection_attachments,
  //         new_attachment
  //       )

  //       await update(
  //         DB_REF.db,
  //         DB_REF.collection_general,
  //         { _id: new ObjectId(contract_ref_id) },
  //         { $push: { attachments: { $each: attachment_ids } } }
  //       )

  //     }
  //   )
  // }
}