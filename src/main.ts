import { NodeSSH } from "node-ssh";
import { createCore } from "./core/main";
import { createHooks } from "./libs/hooks";
import { createRepository } from "./libs/repository";
import { createPresenter } from "./libs/presenter";
import { createCli } from "./cli/main";

const main = () => {
  const connection = new NodeSSH();

  connection
    .connect({
      host: "10.41.177.169",
      username: "git",
      password: "password",
    })
    .then(() => {
      const core = createCore({
        applicationRepository: createRepository(connection),
        hooks: createHooks(connection),
        presenter: createPresenter(connection),
      });

      createCli(core, connection);
    });
};

main();
