import { Core } from "../core/main";
import { program } from "./config";

const createCli = (core: Core) => console.log(program.args);

export { createCli };
