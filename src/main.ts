#!/usr/bin/env node
import { createCore } from "./core/main";
import { createRepository } from "./libs/repository";
import { createPresenter } from "./libs/presenter";
import { createCli } from "./cli/main";
import { createLoader } from "./libs/loader";
import { createGateKeeper } from "./libs/gatekeeper";
import { createSessionManager } from "./libs/sessionManager";

const main = () => {
  const core = createCore({
    repository: createRepository(),
    presenter: createPresenter(createLoader()),
    gatekeeper: createGateKeeper(),
    sessionManager: createSessionManager(),
  });

  createCli(core);
};

main();
