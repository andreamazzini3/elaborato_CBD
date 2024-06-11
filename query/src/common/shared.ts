import { MongoClient } from "mongodb";

const URI = 'mongodb://localhost:27017';
export const client = new MongoClient(URI);

export const DB_REF = {
  db: 'contracts-referencing',
  collection_general: 'general-contracts',
  collection_attachments: 'attachments-contracts'
}

export const DB_EMB = {
  db: 'contracts-embedded',
  collection: 'contracts',
}

export const FgYellow = "\x1b[33m";
export const FgCyan = "\x1b[36m"
export const Reset = "\x1b[0m"
export const contract_ref_label = FgYellow + '⇒ contracts-ref' + Reset
export const contract_emb_label = FgCyan + '↪ contracts-emb' + Reset

export const measureExecutionTime = async (label: string, operation: () => Promise<any>) => {
  const start = process.hrtime();
  const result = await operation();
  const end = process.hrtime(start);
  console.log(`${label} - execution time: ${end[0]}s ${end[1] / 1000000}ms`);

  return result;
};
