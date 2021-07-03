import { ApplicationRepository } from "./adapters/applicationRepository";
import { UserRepository } from "./adapters/userRepository";
import { ApplicationCreationPresenter } from "./adapters/applicationCreationPresenter";
import { RegistrationPresenter } from "./adapters/registrationPresenter";
import {
  ApplicationCreationInteractor,
  createApplicationCreationInteractor,
} from "./useCases/createApplication";
import {
  RegistrationInteractor,
  createRegistrationInteractor,
} from "./useCases/register";

interface Presenter
  extends RegistrationPresenter,
    ApplicationCreationPresenter {}
interface Repository extends UserRepository, ApplicationRepository {}

type Dependencies = {
  repository: Repository;
  presenter: Presenter;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
  register: RegistrationInteractor;
};

const createCore = (dependencies: Dependencies): Core => ({
  createApplication: createApplicationCreationInteractor(
    dependencies.repository,
    dependencies.presenter
  ),
  register: createRegistrationInteractor(
    dependencies.repository,
    dependencies.presenter
  ),
});

export { createCore, Core, Dependencies, Repository, Presenter };
