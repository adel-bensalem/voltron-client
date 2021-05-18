import { NodeSSH } from "node-ssh";
import { Presenter } from "./types";

const createPresenter = (connection: NodeSSH): Presenter => ({
  presentApplicationCreationSuccess: ({ name }) => {
    console.log(`Created application ${name}`);
    connection.dispose();
  },
  presentApplicationCreationFailure: (error) => {
    console.log(`An error occurred:`, error);
    connection.dispose();
  },
});

export { createPresenter };
