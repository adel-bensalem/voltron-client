import { blue, red, yellow, white } from "colors";
import { Loader, Presenter } from "./types";

const createPresenter = (loader: Loader): Presenter => ({
  presentAuthenticationRequest() {
    loader.start(white(`Starting authentication...`));
  },
  presentAuthenticationSuccess({ email }, key) {
    loader.stop();
    console.log(
      blue(`Successfully authenticated to ${email}, here is your key:\n\n`) +
        key
    );
  },
  presentAuthenticationFailure(error) {
    loader.stop();
    error.areCredentialsInvalid
      ? console.log(red("Your credentials are invalid"))
      : error.wasAccountNotFound
      ? console.log(red("Your credentials did not match any account"))
      : console.log(red("An unexpected error occured"));
  },
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
  presentApplicationCreationFailure: (error, { name }) => {
    loader.stop();
    error.doesApplicationExists
      ? console.log(yellow(`Application ${blue(name)} already exists`))
      : error.isApplicationInvalid
      ? console.log(red("The provided application name is invalid"))
      : error.wasSessionNotFound
      ? console.log(red("You must be authenticated to create an application"))
      : console.log(red("An unexpected error occured"));
  },
});

export { createPresenter };
