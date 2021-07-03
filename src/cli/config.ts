import { program } from "commander";

program
  .option("-k, --key <key>", "SSH key file")
  .option("-h, --help", "Print manual")
  .option("-e, --email <email>", "Account email", "")
  .option("-p, --password <password>", "Account password", "");

program.parse(process.argv);

export { program };
