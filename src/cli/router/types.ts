type Options = { [key: string]: string };

type CommandHandler = (
  command: string,
  value: string,
  options: Options
) => void;

interface Router {
  add(command: string, handleCommand: CommandHandler): void;
  addFallback(handleCommand: CommandHandler): void;
  exec(command: string, value: string, options: Options): void;
}

export { Router, CommandHandler };
