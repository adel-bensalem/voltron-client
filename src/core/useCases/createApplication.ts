import { Application } from "@types";
import { ApplicationRepository } from "../adapters/applicationRepository";
import { ApplicationCreationPresenter } from "../adapters/applicationCreationPresenter";
import { SessionManager } from "../adapters/sessionManager";
import { isApplicationValid } from "../entities/applicationValidator";

type ApplicationCreationInteractor = (application: Application) => void;

const createApplicationCreationInteractor =
  (
    repository: ApplicationRepository,
    sessionManager: SessionManager,
    presenter: ApplicationCreationPresenter
  ): ApplicationCreationInteractor =>
  (application) => {
    presenter.presentApplicationCreationRequest(application);

    isApplicationValid(application)
      ? sessionManager
          .retrieve()
          .then(({ user }) =>
            repository
              .saveApplication(application, user)
              .then(() =>
                presenter.presentApplicationCreationSuccess(application)
              )
              .catch((e) =>
                presenter.presentApplicationCreationFailure(e, application)
              )
          )
          .catch(() =>
            presenter.presentApplicationCreationFailure(
              {
                wasSessionNotFound: true,
                isApplicationInvalid: false,
                doesApplicationExists: false,
              },
              application
            )
          )
      : presenter.presentApplicationCreationFailure(
          {
            isApplicationInvalid: true,
            doesApplicationExists: false,
            wasSessionNotFound: false,
          },
          application
        );
  };

export { createApplicationCreationInteractor, ApplicationCreationInteractor };
