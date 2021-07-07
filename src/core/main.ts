import { ApplicationRepository } from "./adapters/applicationRepository";
import { UserRepository } from "./adapters/userRepository";
import { Gatekeeper } from "./adapters/gatekeeper";
import { SessionManager } from "./adapters/sessionManager";
import { ApplicationCreationPresenter } from "./adapters/applicationCreationPresenter";
import { RegistrationPresenter } from "./adapters/registrationPresenter";
import { AuthenticationPresenter } from "./adapters/authenticationPresenter";
import { ApplicationDeploymentPresenter } from "./adapters/applicationDeploymentPresenter";
import { Shuttle } from "./adapters/shuttle";
import { RequirementsChecker } from "./adapters/requirementsChecker";
import { ApplicationsRetrievalPresenter } from "./adapters/applicationsRetrievalPresenter";
import { ApplicationLogsRetrievalPresenter } from "./adapters/applicationLogsRetrievalPresenter";
import { LogsCollector } from "./adapters/logsCollector";
import {
  ApplicationCreationInteractor,
  createApplicationCreationInteractor,
} from "./useCases/createApplication";
import {
  RegistrationInteractor,
  createRegistrationInteractor,
} from "./useCases/register";
import {
  AuthenticationInteractor,
  createAuthenticationInteractor,
} from "./useCases/authenticate";
import {
  ApplicationDeploymentInteractor,
  createApplicationDeploymentInteractor,
} from "./useCases/deployApplication";
import {
  ApplicationsRetrievalInteractor,
  createApplicationsRetrievalInteractor,
} from "./useCases/retrieveApplications";
import {
  ApplicationLogsRetrievalInteractor,
  createApplicationLogsRetrievalInteractor,
} from "./useCases/retrieveApplicationLogs";

interface Presenter
  extends RegistrationPresenter,
    AuthenticationPresenter,
    ApplicationDeploymentPresenter,
    ApplicationsRetrievalPresenter,
    ApplicationLogsRetrievalPresenter,
    ApplicationCreationPresenter {}
interface Repository extends UserRepository, ApplicationRepository {}

type Dependencies = {
  repository: Repository;
  presenter: Presenter;
  gatekeeper: Gatekeeper;
  sessionManager: SessionManager;
  shuttle: Shuttle;
  requirementsChecker: RequirementsChecker;
  logsCollector: LogsCollector;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
  register: RegistrationInteractor;
  authenticate: AuthenticationInteractor;
  deployApplication: ApplicationDeploymentInteractor;
  retrieveApplications: ApplicationsRetrievalInteractor;
  retrieveApplicationLogs: ApplicationLogsRetrievalInteractor;
};

const createCore = (dependencies: Dependencies): Core => ({
  createApplication: createApplicationCreationInteractor(
    dependencies.repository,
    dependencies.sessionManager,
    dependencies.presenter
  ),
  register: createRegistrationInteractor(
    dependencies.repository,
    dependencies.presenter
  ),
  authenticate: createAuthenticationInteractor(
    dependencies.gatekeeper,
    dependencies.sessionManager,
    dependencies.presenter
  ),
  retrieveApplications: createApplicationsRetrievalInteractor(
    dependencies.repository,
    dependencies.sessionManager,
    dependencies.presenter
  ),
  deployApplication: createApplicationDeploymentInteractor(
    dependencies.sessionManager,
    dependencies.gatekeeper,
    dependencies.shuttle,
    dependencies.requirementsChecker,
    dependencies.presenter
  ),
  retrieveApplicationLogs: createApplicationLogsRetrievalInteractor(
    dependencies.logsCollector,
    dependencies.sessionManager,
    dependencies.presenter
  ),
});

export {
  createCore,
  Core,
  Dependencies,
  Repository,
  Presenter,
  Gatekeeper,
  SessionManager,
  Shuttle,
  RequirementsChecker,
  LogsCollector,
};
