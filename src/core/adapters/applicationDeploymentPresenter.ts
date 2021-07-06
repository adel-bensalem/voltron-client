import { ApplicationDeploymentError } from "@types";

interface ApplicationDeploymentPresenter {
  presentApplicationDeploymentRequest(
    applicationName: string,
    applicationPath: string
  ): void;
  presentApplicationDeploymentSuccess(
    applicationName: string,
    applicationPath: string
  ): void;
  presentApplicationDeploymentFailure(
    error: ApplicationDeploymentError,
    applicationName: string,
    applicationPath: string
  ): void;
}

export { ApplicationDeploymentPresenter };
