import { ApplicationDeploymentError } from "@types";
import { ApplicationDeploymentPresenter } from "../adapters/applicationDeploymentPresenter";
import { SessionManager } from "../adapters/sessionManager";
import { Shuttle } from "../adapters/shuttle";
import { Gatekeeper } from "../adapters/gatekeeper";
import { RequirementsChecker } from "../adapters/requirementsChecker";
import { DeploymentLog } from "../adapters/deploymentLog";

type ApplicationDeploymentInteractor = (
  applicationName: string,
  applicationPath: string
) => void;

const createApplicationDeploymentInteractor =
  (
    sessionManager: SessionManager,
    gatekeeper: Gatekeeper,
    log: DeploymentLog,
    shuttle: Shuttle,
    requirementsChecker: RequirementsChecker,
    presenter: ApplicationDeploymentPresenter
  ): ApplicationDeploymentInteractor =>
  (applicationName, applicationPath) => {
    const error: ApplicationDeploymentError = {
      hasDeploymentFailed: false,
      wasApplicationNotFound: false,
      wasApplicationPathInvalid: false,
      wasSessionNotFound: false,
      hasInvalidRequirements: false,
      wasPermissionDenied: false,
    };
    presenter.presentApplicationDeploymentRequest(
      applicationName,
      applicationPath
    );

    requirementsChecker
      .checkDeploymentRequirements({
        name: applicationName,
        path: applicationPath,
      })
      .then(() =>
        sessionManager
          .retrieve()
          .then(({ user, key }) =>
            gatekeeper
              .ensureUserPermission(user, `application.${applicationName}`)
              .then(() => log.tagDeployment({ name: applicationName }))
              .then(({ tag }) =>
                shuttle
                  .deploy(key, {
                    name: applicationName,
                    path: applicationPath,
                    tag,
                  })
                  .then(() =>
                    presenter.presentApplicationDeploymentSuccess(
                      applicationName,
                      applicationPath
                    )
                  )
                  .catch(() =>
                    presenter.presentApplicationDeploymentFailure(
                      {
                        ...error,
                        hasDeploymentFailed: true,
                      },
                      applicationName,
                      applicationPath
                    )
                  )
              )
              .catch(() =>
                presenter.presentApplicationDeploymentFailure(
                  {
                    ...error,
                    wasPermissionDenied: true,
                  },
                  applicationName,
                  applicationPath
                )
              )
          )
          .catch(() =>
            presenter.presentApplicationDeploymentFailure(
              {
                ...error,
                wasSessionNotFound: true,
              },
              applicationName,
              applicationPath
            )
          )
      )
      .catch(() =>
        presenter.presentApplicationDeploymentFailure(
          {
            ...error,
            hasInvalidRequirements: true,
          },
          applicationName,
          applicationPath
        )
      );
  };

export {
  createApplicationDeploymentInteractor,
  ApplicationDeploymentInteractor,
};
