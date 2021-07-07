#!/usr/bin/env node
import { createCore } from "./core/main";
import { createRepository } from "./libs/repository";
import { createPresenter } from "./libs/presenter";
import { createCli } from "./cli/main";
import { createLoader } from "./libs/loader";
import { createGateKeeper } from "./libs/gatekeeper";
import { createSessionManager } from "./libs/sessionManager";
import { createShuttle } from "./libs/shuttle";
import { createRequirementsChecker } from "./libs/requirementsChecker";
import { createLogsCollector } from "./libs/logsCollector";

const main = () => {
  const core = createCore({
    repository: createRepository(),
    presenter: createPresenter(createLoader()),
    gatekeeper: createGateKeeper(),
    sessionManager: createSessionManager(),
    shuttle: createShuttle(),
    requirementsChecker: createRequirementsChecker(),
    logsCollector: createLogsCollector(),
  });

  createCli(core);
};

main();
