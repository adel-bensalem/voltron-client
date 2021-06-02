import { ApplicationCreationPresenter } from "../../core/main";

interface Presenter extends ApplicationCreationPresenter {}

interface Loader {
  start(message: string): void;
  stop(): void;
}

export { Presenter, Loader };
