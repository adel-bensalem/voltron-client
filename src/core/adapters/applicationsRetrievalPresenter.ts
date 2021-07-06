import { Application, ApplicationsRetrievalError, Identifiable } from "@types";

interface ApplicationsRetrievalPresenter {
  presentApplicationsRetrievalRequest(): void;
  presentApplicationsRetrievalSuccess(
    applications: Identifiable<Application>[]
  ): void;
  presentApplicationsRetrievalFailure(error: ApplicationsRetrievalError): void;
}

export { ApplicationsRetrievalPresenter };
