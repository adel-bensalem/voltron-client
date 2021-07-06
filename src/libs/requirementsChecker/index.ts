import { RequirementsChecker } from "@core";
import * as fs from "fs";

const createRequirementsChecker = (): RequirementsChecker => ({
  checkDeploymentRequirements: ({ path }): Promise<void> =>
    fs.existsSync(`${process.cwd()}/${path}/Dockerfile`) &&
    fs.existsSync(`${process.cwd()}/${path}/.git`)
      ? Promise.resolve()
      : Promise.reject(),
});

export { createRequirementsChecker };
