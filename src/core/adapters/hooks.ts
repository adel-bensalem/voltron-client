import { Application } from "../../types/application";

interface Hooks {
  enablePostUpdateHook(application: Application): Promise<void>;
}

export { Hooks };
