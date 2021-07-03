#!/usr/bin/env node
import { createCore } from "./core/main";
import { createRepository } from "./libs/repository";
import { createPresenter } from "./libs/presenter";
import { createCli } from "./cli/main";
import { createLoader } from "./libs/loader";

const main = () => {
  const core = createCore({
    repository: createRepository(),
    presenter: createPresenter(createLoader()),
  });

  createCli(core);
};

main();
