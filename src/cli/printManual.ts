import { bold, white } from "colors";

const printManual = () =>
  console.log(
    `
${bold(white("Usage:"))}
  voltron [OPTION...] [COMMAND] [VALUE]

${bold(white("Options:"))}
  -k, --key          ssh key used to interact with repository - mandatory
  -h, --help         print usage information
  -e, --email        provide an email for authentication or registration
  -p, --password     provide a password for authentication or registration
    
${bold(white("Commands:"))}
  create             create a new application, takes an application name as value
  register           create an account in Voltron system, requires an email [-e] and a password [-p]
`.trim()
  );

export { printManual };
