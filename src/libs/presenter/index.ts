import { NodeSSH } from "node-ssh";
import { blue, red } from "colors";
import { Presenter } from "./types";

const createPresenter = (connection: NodeSSH): Presenter => ({
  presentApplicationCreationSuccess: ({ name }) => {
    console.log(blue(`Created application ${name}`));
    connection.dispose();
  },
  presentApplicationCreationFailure: (error) => {
    console.log(red(`An error occurred:`), error);
    connection.dispose();
  },
});

export { createPresenter };
