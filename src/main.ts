#!/usr/bin/env node
import { createCore } from "./core/main";
import { createRepository } from "./libs/repository";
import { createPresenter } from "./libs/presenter";
import { createCli } from "./cli/main";

const main = () => {
  const core = createCore({
    applicationRepository: createRepository(),
    presenter: createPresenter(),
  });

  createCli(core);
};

main();
