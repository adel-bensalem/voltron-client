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
      .then((application) =>
        !!application
          ? isApplicationValid(application)
            ? repository
                .saveApplication(application)
                .then(hooks.enablePostUpdateHook)
                .then(() =>
                  presenter.presentApplicationCreationSuccess(application)
                )
                .catch(presenter.presentApplicationCreationFailure)
            : presenter.presentApplicationCreationFailure({
                isApplicationInvalid: true,
                doesApplicationExists: false,
              })
          : presenter.presentApplicationCreationFailure({
              isApplicationInvalid: false,
              doesApplicationExists: true,
            })
      )
      .catch(presenter.presentApplicationCreationFailure);

export { createApplicationCreationInteractor, ApplicationCreationInteractor };
