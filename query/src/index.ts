import { client } from "./common/shared";
import { exec as find_exec } from "./queries/find.query";
import { exec as create_exec } from "./queries/create.query";

async function exec() {
  // await find_exec()
  // await create_exec()





  await client.close();
}

exec()
