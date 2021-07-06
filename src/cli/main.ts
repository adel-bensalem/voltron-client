import { Core } from "../core/main";
import { program } from "./config";
import { createRouter } from "./router";
import { printManual } from "./printManual";

const createCli = (core: Core) => {
  const [command = "", value = ""] = program.args;
  const router = createRouter();

  router.add("create", (_, name, { help }) =>
    !help && !!name ? core.createApplication({ name }) : printManual("create")
  );
  router.add("register", (command, _, { email, password, help }) =>
    !help ? core.register({ email, password }) : printManual("register")
  );
  router.add("authenticate", (command, name, { email, password, help }) =>
    !help ? core.authenticate({ email, password }) : printManual("authenticate")
  );
  router.add("deploy", (command, name, { application, path, help }) =>
    !help ? core.deployApplication(application, path) : printManual("deploy")
  );
  router.addFallback(printManual);
  router.exec(command, value, program.opts());
};

export { createCli };
