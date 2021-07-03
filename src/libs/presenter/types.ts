import { Presenter } from "@core";

interface Loader {
  start(message: string): void;
  stop(): void;
}

export { Presenter, Loader };
