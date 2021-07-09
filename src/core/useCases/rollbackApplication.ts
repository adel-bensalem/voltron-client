import { ApplicationDock } from "../adapters/applicationDock";
import { ApplicationRollbackPresenter } from "../adapters/applicationRollbackPresenter";
import { SessionManager } from "../adapters/sessionManager";

type ApplicationRollbackInteractor = (
  applicationName: string,
  tag: string
) => void;

const createApplicationRollbackInteractor =
  (
    dock: ApplicationDock,
    sessionManager: SessionManager,
    presenter: ApplicationRollbackPresenter
  ): ApplicationRollbackInteractor =>
  (applicationName, tag) => {
    presenter.presentApplicationRollbackRequest(applicationName, tag);

    sessionManager
      .retrieve()
      .then(({ user }) =>
        dock
          .deployApplicationAtTag(user, { name: applicationName }, tag)
          .then((deployment) =>
            presenter.presentApplicationRollbackSuccess(
              deployment,
              applicationName
            )
          )
          .catch((e) =>
            presenter.presentApplicationRollbackFailure(
              {
                wasSessionNotFound: false,
                wasApplicationNotFound: false,
                wasPermissionDenied: false,
                wasTagNotFound: false,
                ...e,
              },
              applicationName,
              tag
            )
          )
      )
      .catch(() =>
        presenter.presentApplicationRollbackFailure(
          {
            wasSessionNotFound: true,
            wasApplicationNotFound: false,
            wasPermissionDenied: false,
            wasTagNotFound: false,
          },
          applicationName,
          tag
        )
      );
  };

export { createApplicationRollbackInteractor, ApplicationRollbackInteractor };
