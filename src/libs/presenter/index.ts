import { blue, red, yellow, white } from "colors";
import { Loader, Presenter } from "./types";

const createPresenter = (loader: Loader): Presenter => ({
  presentApplicationCreationRequest({ name }) {
    loader.start(white(`Creating ${blue(name)}...`));
  },
  presentApplicationCreationSuccess: ({ name }) => {
    loader.stop();
    console.log(blue(`Created application ${name}`));
  },
  presentApplicationCreationFailure: (
    { isApplicationInvalid, doesApplicationExists },
    { name }
  ) => {
    loader.stop();
    doesApplicationExists
      ? console.log(yellow(`Application ${blue(name)} already exists`))
      : isApplicationInvalid
      ? console.log(red("The provided application name is invalid"))
      : console.log(red("An unexpected error occured"));
  },
});

export { createPresenter };
