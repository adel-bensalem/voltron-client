import { NodeSSH } from "node-ssh";
import { program } from "commander";
import { createCore } from "./core/main";
import { createHooks } from "./libs/hooks";
import { createRepository } from "./libs/repository";
import { createPresenter } from "./libs/presenter";

const main = () => {
  const connection = new NodeSSH();

  program.parse();
  connection
    .connect({
      host: "192.168.0.43",
      username: "git",
      password: "password",
    })
    .then(() => {
      const [application] = program.args;
      const core = createCore({
        applicationRepository: createRepository(connection),
        hooks: createHooks(connection),
        presenter: createPresenter(connection),
      });

      core.createApplication({ name: application });
    });
};

main();
