import { ApplicationLogsRetrievalError } from "@types";

interface ApplicationLogsRetrievalPresenter {
  presentApplicationLogsRetrievalRequest(): void;
  presentApplicationLogsRetrievalSuccess(logs: string[]): void;
  presentApplicationLogsRetrievalFailure(
    error: ApplicationLogsRetrievalError,
    applicationName: string
  ): void;
}

export { ApplicationLogsRetrievalPresenter };
