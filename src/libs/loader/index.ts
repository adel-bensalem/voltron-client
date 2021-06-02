import ora, { Ora } from "ora";
import { Loader } from "../presenter/types";

const createLoader = (): Loader => {
  let instance: Ora | null = null;

  return {
    stop(): void {
      instance && instance.stop();
    },
    start(message: string): void {
      instance = ora(message);
      instance.start(message);
    },
  };
};

export { createLoader };
