import { Router, CommandHandler } from "./types";

const createRouter = (): Router => {
  const routes: { [key: string]: CommandHandler } = {};

  return {
    add(command, handleCommand) {
      routes[command] = handleCommand;
    },
    addFallback(handleCommand) {
      routes._ = handleCommand;
    },
    exec(command, value, options) {
      !!routes[command]
        ? routes[command](command, value, options)
        : !!routes._ && routes._(command, value, options);
    },
  };
};

export { createRouter };
