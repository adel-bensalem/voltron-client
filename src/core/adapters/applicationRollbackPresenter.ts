import { ApplicationRollbackError, Deployment, Identifiable } from "@types";

interface ApplicationRollbackPresenter {
  presentApplicationRollbackRequest(applicationName: string, tag: string): void;
  presentApplicationRollbackSuccess(
    deployment: Identifiable<Deployment>,
    applicationName: string
  ): void;
  presentApplicationRollbackFailure(
    error: ApplicationRollbackError,
    applicationName: string,
    tag: string
  ): void;
}

export { ApplicationRollbackPresenter };
