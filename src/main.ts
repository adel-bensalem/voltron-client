#!/usr/bin/env node
import { createCore } from "./core/main";
import { createRepository } from "./libs/repository";
import { createPresenter } from "./libs/presenter";
import { program } from "./cli/config";
import { printManual } from "./cli/printManual";
import { createCli } from "./cli/main";

const main = () => {
  const options = program.opts();
  const core = createCore({
    applicationRepository: createRepository(options.key),
    presenter: createPresenter(),
  });

  options.key ? createCli(core) : printManual();
};

main();
