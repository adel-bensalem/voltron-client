import { NodeSSH } from "node-ssh";
import { createCore } from "./core/main";
import { createHooks } from "./libs/hooks";
import { createRepository } from "./libs/repository";
import { createPresenter } from "./libs/presenter";
import { program } from "./cli/config";
import { createCli } from "./cli/main";

const main = () => {
  const connection = new NodeSSH();
  const options = program.opts();

  connection
    .connect({
      host: "10.41.177.169",
      username: "git",
      privateKey: options.key,
    })
    .then(() => {
      const core = createCore({
        applicationRepository: createRepository(connection),
        hooks: createHooks(connection),
        presenter: createPresenter(connection),
      });

      createCli(core, connection);
    })
    .catch(() =>
      console.log(
        "Connection to server failed, the provided ssh key is either invalid or the server is down"
      )
    );
};

main();
