import { client } from "./common/shared";
import { exec as find_exec } from "./queries/find.query";
import { exec as create_exec } from "./queries/create.query";
import { exec as update_exec } from "./queries/update.query";

async function exec() {
  await find_exec()
  // await create_exec()
  // await update_exec()





  await client.close();
}

exec()
