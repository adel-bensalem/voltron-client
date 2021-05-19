import { NodeSSH } from "node-ssh";
import { Core } from "../core/main";
import { program } from "./config";
import { createRouter } from "./router";

const createCli = (core: Core, connection: NodeSSH) => {
  program.parse();
  const [command, value] = program.args;
  const router = createRouter();

  router.add("create", (_, name) => core.createApplication({ name }));
  router.addFallback((command) => {
    console.log(`No command matched ${command}`);
    connection.dispose();
  });
  router.exec(command, value, program.opts());
};

export { createCli };
