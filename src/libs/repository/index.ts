import { Repository } from "./types";
import { Application } from "../../types/application";
import { connectToHost } from "./ssh";

const createRepository = (key: string): Repository => ({
  saveApplication: (application: Application): Promise<Application> =>
    connectToHost(key).then((connection) =>
      connection
        .execCommand(
          `ansible-playbook -i /etc/ansible/voltron-control-node/inventory -e "application_name=${application.name}" /etc/ansible/voltron-control-node/create-application.yml`
        )
        .then(() => application)
        .finally(() => connection.dispose())
    ),
  findApplication: (application: Application): Promise<Application | null> =>
    connectToHost(key).then((connection) =>
      connection
        .execCommand(`[ -d /srv/git/${application.name}.git ]`)
        .then(({ code }) => (code === 1 ? null : application))
        .finally(() => connection.dispose())
    ),
});

export { createRepository };
