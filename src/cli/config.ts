import { program } from "commander";

program
  .option("-k, --key <key>", "SSH key file")
  .option("-h, --help", "Print manual");

program.parse(process.argv);

export { program };
