import { NodeSSH } from "node-ssh";
import { Repository } from "./types";
import { Application } from "../../types/application";

const createRepository = (connection: NodeSSH): Repository => ({
  saveApplication: (application: Application): Promise<Application> =>
    connection
      .execCommand(
        `mkdir ~/${application.name}.git && cd ~/${application.name}.git && git init --bare`
      )
      .then(() => application),
  findApplication: (application: Application): Promise<Application | null> =>
    connection
      .execCommand(`[ -d ~/${application.name}.git ]`)
      .then(({ code }) => (code !== 0 ? application : null)),
});

export { createRepository };
