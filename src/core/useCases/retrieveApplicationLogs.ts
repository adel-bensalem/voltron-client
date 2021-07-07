import { LogsCollector } from "../adapters/logsCollector";
import { ApplicationLogsRetrievalPresenter } from "../adapters/applicationLogsRetrievalPresenter";

type ApplicationLogsRetrievalInteractor = (applicationName: string) => void;

const createApplicationLogsRetrievalInteractor =
  (
    logsCollector: LogsCollector,
    presenter: ApplicationLogsRetrievalPresenter
  ): ApplicationLogsRetrievalInteractor =>
  (applicationName) => {
    presenter.presentApplicationLogsRetrievalRequest();

    logsCollector
      .collectLogs(applicationName)
      .then(presenter.presentApplicationLogsRetrievalSuccess)
      .catch((e) =>
        presenter.presentApplicationLogsRetrievalFailure(e, applicationName)
      );
  };

export {
  createApplicationLogsRetrievalInteractor,
  ApplicationLogsRetrievalInteractor,
};
