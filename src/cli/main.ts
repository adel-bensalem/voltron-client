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
  router.add("authenticate", (command, _, { email, password, help }) =>
    !help ? core.authenticate({ email, password }) : printManual("authenticate")
  );
  router.add("deploy", (command, _, { application, path, help }) =>
    !help ? core.deployApplication(application, path) : printManual("deploy")
  );
  router.add("list", (command, _, { help }) =>
    !help ? core.retrieveApplications() : printManual("list")
  );
  router.add("logs", (command, name, { help }) =>
    !help && !!name ? core.retrieveApplicationLogs(name) : printManual("logs")
  );
  router.add("deployments", (command, name, { help }) =>
    !help && !!name
      ? core.retrieveApplicationDeployments(name)
      : printManual("deployments")
  );
  router.add("rollback", (command, _, { help, application, tag }) =>
    !help && !!application && !!tag
      ? core.rollbackApplication(application, tag)
      : printManual("rollback")
  );
  router.addFallback(printManual);
  router.exec(command, value, program.opts());
};

export { createCli };
