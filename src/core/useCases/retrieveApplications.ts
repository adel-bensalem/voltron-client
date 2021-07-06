import { SessionManager } from "@core";
import { ApplicationsRetrievalPresenter } from "../adapters/applicationsRetrievalPresenter";
import { ApplicationRepository } from "../adapters/applicationRepository";

type ApplicationsRetrievalInteractor = () => void;

const createApplicationsRetrievalInteractor =
  (
    repository: ApplicationRepository,
    sessionManager: SessionManager,
    presenter: ApplicationsRetrievalPresenter
  ): ApplicationsRetrievalInteractor =>
  () => {
    presenter.presentApplicationsRetrievalRequest();

    sessionManager
      .retrieve()
      .then(({ user }) =>
        repository
          .getUserApplications(user)
          .then(presenter.presentApplicationsRetrievalSuccess)
          .catch(presenter.presentApplicationsRetrievalFailure)
      )
      .catch(() =>
        presenter.presentApplicationsRetrievalFailure({
          hasUnExpectedError: false,
          wasSessionNotFound: true,
          wasUserNotFound: false,
        })
      );
  };

export {
  createApplicationsRetrievalInteractor,
  ApplicationsRetrievalInteractor,
};
