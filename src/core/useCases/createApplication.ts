import { Application } from "../../types/application";
import { ApplicationRepository } from "../adapters/applicationRepository";
import { ApplicationCreationPresenter } from "../adapters/applicationCreationPresenter";
import { isApplicationValid } from "../entities/applicationValidator";

type ApplicationCreationInteractor = (application: Application) => void;

const createApplicationCreationInteractor =
  (
    repository: ApplicationRepository,
    presenter: ApplicationCreationPresenter
  ): ApplicationCreationInteractor =>
  (application) =>
    isApplicationValid(application)
      ? repository
          .saveApplication(application)
          .then(() => presenter.presentApplicationCreationSuccess(application))
          .catch((e) => {
            console.log(e);
            presenter.presentApplicationCreationFailure(e, application);
          })
      : presenter.presentApplicationCreationFailure(
          {
            isApplicationInvalid: true,
            doesApplicationExists: false,
          },
          application
        );

export { createApplicationCreationInteractor, ApplicationCreationInteractor };
