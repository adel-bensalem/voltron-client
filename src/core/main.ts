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
import { ApplicationDeploymentsRetrievalPresenter } from "./adapters/applicationDeploymentsRetrievalPresenter";
import { ApplicationRollbackPresenter } from "./adapters/applicationRollbackPresenter";
import { LogsCollector } from "./adapters/logsCollector";
import { DeploymentLog } from "./adapters/deploymentLog";
import { ApplicationDock } from "./adapters/applicationDock";
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
import {
  ApplicationDeploymentsRetrievalInteractor,
  createApplicationDeploymentsRetrievalInteractor,
} from "./useCases/retrieveApplicationDeployments";
import {
  ApplicationRollbackInteractor,
  createApplicationRollbackInteractor,
} from "./useCases/rollbackApplication";

interface Presenter
  extends RegistrationPresenter,
    AuthenticationPresenter,
    ApplicationDeploymentPresenter,
    ApplicationsRetrievalPresenter,
    ApplicationLogsRetrievalPresenter,
    ApplicationDeploymentsRetrievalPresenter,
    ApplicationRollbackPresenter,
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
  deploymentLog: DeploymentLog;
  applicationDock: ApplicationDock;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
  register: RegistrationInteractor;
  authenticate: AuthenticationInteractor;
  deployApplication: ApplicationDeploymentInteractor;
  retrieveApplications: ApplicationsRetrievalInteractor;
  retrieveApplicationLogs: ApplicationLogsRetrievalInteractor;
  retrieveApplicationDeployments: ApplicationDeploymentsRetrievalInteractor;
  rollbackApplication: ApplicationRollbackInteractor;
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
    dependencies.deploymentLog,
    dependencies.shuttle,
    dependencies.requirementsChecker,
    dependencies.presenter
  ),
  retrieveApplicationLogs: createApplicationLogsRetrievalInteractor(
    dependencies.logsCollector,
    dependencies.sessionManager,
    dependencies.presenter
  ),
  retrieveApplicationDeployments:
    createApplicationDeploymentsRetrievalInteractor(
      dependencies.deploymentLog,
      dependencies.sessionManager,
      dependencies.presenter
    ),
  rollbackApplication: createApplicationRollbackInteractor(
    dependencies.applicationDock,
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
  DeploymentLog,
  ApplicationDock,
};
