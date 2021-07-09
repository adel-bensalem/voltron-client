import { program } from "commander";

program
  .option("-h, --help", "Print manual")
  .option("-e, --email [email]", "Account email", "")
  .option("-p, --password [password]", "Account password", "")
  .option("-p, --path [path]", "Application path", "")
  .option("-a, --application [application]", "Application name", "")
  .option("-t, --tag [tag]", "Application tag", "");

program.parse(process.argv);

export { program };
