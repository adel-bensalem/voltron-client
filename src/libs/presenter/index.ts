import { blue, red, yellow } from "colors";
import { Presenter } from "./types";

const createPresenter = (): Presenter => ({
  presentApplicationCreationSuccess: ({ name }) => {
    console.log(blue(`Created application ${name}`));
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
  },
});

export { createPresenter };
