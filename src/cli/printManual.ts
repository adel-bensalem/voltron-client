import { bold, white } from "colors";

const printManual = () =>
  console.log(
    `
${bold(white("Usage:"))}
  voltron [OPTION...] [COMMAND] [VALUE]

${bold(white("Options:"))}
  -k, --key      ssh key used to interact with repository - mandatory
  -h, --help     print usage information
    
${bold(white("Commands:"))}
  create         create a new application, takes an application name as value
`.trim()
  );

export { printManual };
