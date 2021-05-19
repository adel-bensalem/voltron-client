import { NodeSSH } from "node-ssh";
import { yellow } from "colors";
import { Core } from "../core/main";
import { program } from "./config";
import { createRouter } from "./router";

const createCli = (core: Core, connection: NodeSSH) => {
  const [command, value = ""] = program.args;
  const router = createRouter();

  router.add("create", (_, name) => core.createApplication({ name }));
  router.addFallback((command) => {
    console.log(yellow(`No command matched ${command}`));
    connection.dispose();
  });
  router.exec(command, value, program.opts());
};

export { createCli };