import {
  ApplicationDeploymentsRetrievalError,
  Deployment,
  Identifiable,
} from "@types";

interface ApplicationDeploymentsRetrievalPresenter {
  presentApplicationDeploymentsRetrievalRequest(): void;
  presentApplicationDeploymentsRetrievalSuccess(
    deployments: Identifiable<Deployment>[]
  ): void;
  presentApplicationDeploymentsRetrievalFailure(
    error: ApplicationDeploymentsRetrievalError,
    applicationName: string
  ): void;
}

export { ApplicationDeploymentsRetrievalPresenter };
