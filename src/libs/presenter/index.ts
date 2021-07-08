import { blue, red, yellow, white, bold, magenta } from "colors";
import { Loader, Presenter } from "./types";

const createPresenter = (loader: Loader): Presenter => ({
  presentApplicationLogsRetrievalRequest() {
    loader.start(white(`Looking for logs...`));
  },
  presentApplicationLogsRetrievalFailure(error, applicationName) {
    loader.stop();
    error.wasSessionNotFound
      ? console.log(
          red(`You must be authenticated to view an application's logs`)
        )
      : error.wasPermissionDenied
      ? console.log(
          red(`Permission to access ${applicationName} logs was denied`)
        )
      : error.wasApplicationNotFound
      ? console.log(red(`The application ${applicationName} was not found`))
      : error.isApplicationNotRunning
      ? console.log(red(`The application ${applicationName} is not running`))
      : console.log(red("An unexpected error occured"));
  },
  presentApplicationLogsRetrievalSuccess(logs: string[]) {
    loader.stop();
    console.log(
      logs
        .map(
          (log, index) =>
            `${magenta(
              index === 0 ? "╔═" : index === logs.length - 1 ? "╚═" : "╠═"
            )}\t${white(log)}`
        )
        .join("\n")
    );
  },
  presentApplicationsRetrievalRequest() {
    loader.start(white(`Looking for applications...`));
  },
  presentApplicationsRetrievalSuccess(applications) {
    loader.stop();
    console.log(bold(white("NAME")), "\n");
    applications.map(({ name }) => console.log(white(name)));
  },
  presentApplicationsRetrievalFailure(error) {
    loader.stop();
    error.wasSessionNotFound
      ? console.log(red(`You must be authenticated to deploy an application`))
      : error.wasUserNotFound
      ? console.log(red(`Your account was not found`))
      : console.log(red("An unexpected error occured"));
  },
  presentApplicationDeploymentRequest(applicationName) {
    loader.start(white(`Deploying ${applicationName}...`));
  },
  presentApplicationDeploymentSuccess(applicationName) {
    loader.stop();
    console.log(blue(`Successfully deployed ${applicationName}`));
  },
  presentApplicationDeploymentFailure(error, applicationName, applicationPath) {
    console.log(error);
    loader.stop();
    error.hasDeploymentFailed
      ? console.log(
          red(`Deployment of ${applicationName} at ${applicationPath} failed`)
        )
      : error.hasInvalidRequirements
      ? console.log(
          red(`Your project must be Dockerized and be a git repository`)
        )
      : error.wasPermissionDenied
      ? console.log(
          red(
            `Permission to deploy ${applicationName} at ${applicationPath} was denied`
          )
        )
      : error.wasApplicationNotFound
      ? console.log(
          red(
            `Application ${applicationName} at ${applicationPath} was not found`
          )
        )
      : error.wasSessionNotFound
      ? console.log(red(`You must be authenticated to deploy an application`))
      : console.log(red("An unexpected error occured"));
  },
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
    console.log(error);
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
