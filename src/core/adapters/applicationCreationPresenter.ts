import { Application } from "../../types/application";
import { ApplicationCreationError } from "../../types/applicationCreationError";

interface ApplicationCreationPresenter {
  presentApplicationCreationSuccess(application: Application): void;
  presentApplicationCreationFailure(
    error: ApplicationCreationError,
    application: Application
  ): void;
}

export { ApplicationCreationPresenter };
