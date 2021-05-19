import { ApplicationRepository } from "./adapters/applicationRepository";
import {
  ApplicationCreationInteractor,
  createApplicationCreationInteractor,
} from "./useCases/createApplication";
import { ApplicationCreationPresenter } from "./adapters/applicationCreationPresenter";

type Dependencies = {
  applicationRepository: ApplicationRepository;
  presenter: ApplicationCreationPresenter;
};

type Core = {
  createApplication: ApplicationCreationInteractor;
};

const createCore = (dependencies: Dependencies): Core => ({
  createApplication: createApplicationCreationInteractor(
    dependencies.applicationRepository,
    dependencies.presenter
  ),
});

export {
  createCore,
  Core,
  Dependencies,
  ApplicationRepository,
  ApplicationCreationPresenter,
};
