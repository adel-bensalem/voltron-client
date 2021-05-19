import { NodeSSH } from "node-ssh";
import { blue, red, yellow } from "colors";
import { Presenter } from "./types";

const createPresenter = (connection: NodeSSH): Presenter => ({
  presentApplicationCreationSuccess: ({ name }) => {
    console.log(blue(`Created application ${name}`));
    connection.dispose();
  },
  presentApplicationCreationFailure: (
    { isApplicationInvalid, doesApplicationExists },
    { name }
  ) => {
    doesApplicationExists
      ? console.log(yellow(`Application ${blue(name)} already exists`))
      : isApplicationInvalid
      ? console.log(red("The provided application name is invalid"))
      : console.log(red("An unexpected error occured"));
    connection.dispose();
  },
});

export { createPresenter };
