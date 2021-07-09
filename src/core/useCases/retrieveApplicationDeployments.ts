import { DeploymentLog } from "../adapters/deploymentLog";
import { ApplicationDeploymentsRetrievalPresenter } from "../adapters/applicationDeploymentsRetrievalPresenter";
import { SessionManager } from "../adapters/sessionManager";

type ApplicationDeploymentsRetrievalInteractor = (
  applicationName: string
) => void;

const createApplicationDeploymentsRetrievalInteractor =
  (
    log: DeploymentLog,
    sessionManager: SessionManager,
    presenter: ApplicationDeploymentsRetrievalPresenter
  ): ApplicationDeploymentsRetrievalInteractor =>
  (applicationName) => {
    presenter.presentApplicationDeploymentsRetrievalRequest();

    sessionManager
      .retrieve()
      .then(({ user }) =>
        log
          .retrieveDeployments(user, { name: applicationName })
          .then(presenter.presentApplicationDeploymentsRetrievalSuccess)
          .catch((e) =>
            presenter.presentApplicationDeploymentsRetrievalFailure(
              e,
              applicationName
            )
          )
      )
      .catch(() =>
        presenter.presentApplicationDeploymentsRetrievalFailure(
          {
            wasApplicationNotFound: false,
            wasPermissionDenied: false,
            wasSessionNotFound: true,
          },
          applicationName
        )
      );
  };

export {
  createApplicationDeploymentsRetrievalInteractor,
  ApplicationDeploymentsRetrievalInteractor,
};
