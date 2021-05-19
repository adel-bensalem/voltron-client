import { Repository } from "./types";
import { Application } from "../../types/application";
import { NodeSSH } from "node-ssh";

const createRepository = (key: string): Repository => ({
  saveApplication(application: Application): Promise<Application> {
    const connection = new NodeSSH();

    return connection
      .connect({
        host: "10.41.177.169",
        username: "git",
        privateKey: key,
      })
      .then(() =>
        connection
          .execCommand(
            `ansible-playbook -i /etc/ansible/voltron-control-node/inventory -e "application_name=${application.name}" /etc/ansible/voltron-control-node/create-application.yml`
          )
          .then(() => application)
          .finally(() => connection.dispose())
      );
  },
  findApplication(application: Application): Promise<Application | null> {
    const connection = new NodeSSH();

    return connection
      .connect({
        host: "10.41.177.169",
        username: "git",
        privateKey: key,
      })
      .then(() =>
        connection
          .execCommand(`[ -d /srv/git/${application.name}.git ]`)
          .then(({ code }) => (code === 1 ? null : application))
          .finally(() => connection.dispose())
      );
  },
});

export { createRepository };
