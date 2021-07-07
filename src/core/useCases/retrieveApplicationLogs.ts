import { LogsCollector } from "../adapters/logsCollector";
import { ApplicationLogsRetrievalPresenter } from "../adapters/applicationLogsRetrievalPresenter";
import { SessionManager } from "../adapters/sessionManager";

type ApplicationLogsRetrievalInteractor = (applicationName: string) => void;

const createApplicationLogsRetrievalInteractor =
  (
    logsCollector: LogsCollector,
    sessionManager: SessionManager,
    presenter: ApplicationLogsRetrievalPresenter
  ): ApplicationLogsRetrievalInteractor =>
  (applicationName) => {
    presenter.presentApplicationLogsRetrievalRequest();

    sessionManager
      .retrieve()
      .then(({ user }) =>
        logsCollector
          .collectLogs(user, applicationName)
          .then(presenter.presentApplicationLogsRetrievalSuccess)
          .catch((e) =>
            presenter.presentApplicationLogsRetrievalFailure(e, applicationName)
          )
      )
      .catch(() =>
        presenter.presentApplicationLogsRetrievalFailure(
          {
            isApplicationNotRunning: false,
            wasApplicationNotFound: false,
            wasPermissionDenied: false,
            wasSessionNotFound: true,
          },
          applicationName
        )
      );
  };

export {
  createApplicationLogsRetrievalInteractor,
  ApplicationLogsRetrievalInteractor,
};
