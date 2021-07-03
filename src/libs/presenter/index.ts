import { blue, red, yellow, white } from "colors";
import { Loader, Presenter } from "./types";

const createPresenter = (loader: Loader): Presenter => ({
  presentRegistrationRequest({ email }) {
    loader.start(white(`Creating an account for ${blue(email)}...`));
  },
  presentRegistrationSuccess({ email }) {
    loader.stop();
    console.log(blue(`Created an account for ${email}`));
  },
  presentRegistrationFailure(error, { email }) {
    loader.stop();
    error.doesUserAlreadyExists
      ? console.log(yellow(`An account already exists for ${blue(email)}`))
      : error.hasInvalidEmail || error.hasInvalidPassword
      ? console.log(red("Your credentials are invalid"))
      : console.log(red("An unexpected error occured"));
  },
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
