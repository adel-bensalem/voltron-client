import { ApplicationRepository } from "./adapters/applicationRepository";
import { UserRepository } from "./adapters/userRepository";
import { Gatekeeper } from "./adapters/gatekeeper";
import { SessionManager } from "./adapters/sessionManager";
import { ApplicationCreationPresenter } from "./adapters/applicationCreationPresenter";
import { RegistrationPresenter } from "./adapters/registrationPresenter";
import { AuthenticationPresenter } from "./adapters/authenticationPresenter";
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

interface Presenter
  extends RegistrationPresenter,
    AuthenticationPresenter,
    ApplicationCreationPresenter {}
interface Repository extends UserRepository, ApplicationRepository {}

type Dependencies = {
  repository: Repository;
  presenter: Presenter;
  gatekeeper: Gatekeeper;
  sessionManager: SessionManager;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
  register: RegistrationInteractor;
  authenticate: AuthenticationInteractor;
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
});

export {
  createCore,
  Core,
  Dependencies,
  Repository,
  Presenter,
  Gatekeeper,
  SessionManager,
};
