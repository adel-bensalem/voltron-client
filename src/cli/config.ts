import { program } from "commander";

program.option("-k, --key <key>", "SSH key file");

program.parse(process.argv);

export { program };
