import { ApplicationRepository } from "./adapters/applicationRepository";
import { Hooks } from "./adapters/hooks";
import {
  ApplicationCreationInteractor,
  createApplicationCreationInteractor,
} from "./useCases/createApplication";
import { ApplicationCreationPresenter } from "./adapters/applicationCreationPresenter";

type Dependencies = {
  applicationRepository: ApplicationRepository;
  hooks: Hooks;
  presenter: ApplicationCreationPresenter;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
};

const createCore = (dependencies: Dependencies): Core => ({
  createApplication: createApplicationCreationInteractor(
    dependencies.applicationRepository,
    dependencies.hooks,
    dependencies.presenter
  ),
});

export {
  createCore,
  Core,
  Dependencies,
  ApplicationRepository,
  Hooks,
  ApplicationCreationPresenter,
};
