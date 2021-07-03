import { yellow } from "colors";
import { Core } from "../core/main";
import { program } from "./config";
import { createRouter } from "./router";
import { printManual } from "./printManual";

const createCli = (core: Core) => {
  const [command = "", value = ""] = program.args;
  const router = createRouter();

  router.add("create", (_, name) => core.createApplication({ name }));
  router.add("register", (command, name, { email, password }) =>
    core.register({ email, password })
  );
  router.addFallback((command, _, { help }) => {
    !command || help
      ? printManual()
      : console.log(yellow(`No command matched ${command}`));
  });
  router.exec(command, value, program.opts());
};

export { createCli };
