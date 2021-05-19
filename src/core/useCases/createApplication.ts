import { Application } from "../../types/application";
import { ApplicationRepository } from "../adapters/applicationRepository";
import { Hooks } from "../adapters/hooks";
import { ApplicationCreationPresenter } from "../adapters/applicationCreationPresenter";
import { isApplicationValid } from "../entities/applicationValidator";

type ApplicationCreationInteractor = (application: Application) => void;

const createApplicationCreationInteractor =
  (
    repository: ApplicationRepository,
    hooks: Hooks,
    presenter: ApplicationCreationPresenter
  ): ApplicationCreationInteractor =>
  (application) =>
    repository
      .findApplication(application)
      .then((app) =>
        !app
          ? isApplicationValid(application)
            ? repository
                .saveApplication(application)
                .then(hooks.enablePostUpdateHook)
                .then(() =>
                  presenter.presentApplicationCreationSuccess(application)
                )
                .catch(() =>
                  presenter.presentApplicationCreationFailure(
                    {
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
                },
                application
              )
          : presenter.presentApplicationCreationFailure(
              {
                isApplicationInvalid: false,
                doesApplicationExists: true,
              },
              application
            )
      )
      .catch(() =>
        presenter.presentApplicationCreationFailure(
          {
            isApplicationInvalid: false,
            doesApplicationExists: false,
          },
          application
        )
      );

export { createApplicationCreationInteractor, ApplicationCreationInteractor };
