import { Credentials, AuthenticationError } from "@types";
import { Gatekeeper } from "../adapters/gatekeeper";
import { AuthenticationPresenter } from "../adapters/authenticationPresenter";
import { SessionManager } from "../adapters/sessionManager";
import { areCredentialsValid } from "../entities/credentialsValidator";

type AuthenticationInteractor = (credentials?: Credentials) => void;

const createAuthenticationInteractor =
  (
    gatekeeper: Gatekeeper,
    sessionManager: SessionManager,
    presenter: AuthenticationPresenter
  ): AuthenticationInteractor =>
  (credentials) => {
    presenter.presentAuthenticationRequest();
    const error: AuthenticationError = {
      isSessionInvalid: false,
      areCredentialsInvalid: false,
      hasUnExpectedError: false,
      wasSessionNotFound: false,
    };

    credentials
      ? areCredentialsValid(credentials.email, credentials.password)
        ? gatekeeper
            .authenticate(credentials)
            .then(({ user, key }) => sessionManager.start(user, key))
            .then(({ user, key }) =>
              presenter.presentAuthenticationSuccess(user, key)
            )
            .catch((e) => {
              console.log(e);
              presenter.presentAuthenticationFailure({ ...error, ...e });
            })
        : presenter.presentAuthenticationFailure({
            ...error,
            areCredentialsInvalid: true,
          })
      : sessionManager
          .retrieve()
          .then(({ user, key }) =>
            presenter.presentAuthenticationSuccess(user, key)
          )
          .catch(() =>
            presenter.presentAuthenticationFailure({
              ...error,
              hasUnExpectedError: true,
            })
          );
  };

export { createAuthenticationInteractor, AuthenticationInteractor };
