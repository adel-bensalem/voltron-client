import { bold, white } from "colors";

const getDefaultManual = () =>
  `
${bold(white("Usage:"))}

  voltron [OPTION...] [COMMAND] [VALUE]

${bold(white("Options:"))}

  -h, --help            print usage information
    
${bold(white("Commands:"))}

  create                create a new application, takes an application name as value
  register              create an account in Voltron system, requires an email [-e] and a password [-p]
  authenticate          authenticate to an account in Voltron system, requires an email [-e] and a password [-p]
  deploy                deploy a Voltron application, takes an application name and a path to the project directory as values
  list                  list joined applications
  logs                  retrieve provided application logs, requires application to be deployed
 `.trim();

const getCreateApplicationManual = () =>
  `
${bold(white("Usage:"))}

  voltron create <APPLICATION_NAME>

${bold(white("Description:"))}

  create a new application, takes an application name as value

${bold(white("Options:"))}

  -h, --help            print usage information
`.trim();

const getRegistrationManual = () =>
  `
${bold(white("Usage:"))}

  voltron register [OPTION...]
  
${bold(white("Description:"))}

  create an account in Voltron system, requires an email [-e] and a password [-p]

${bold(white("Options:"))}

  -h, --help            print usage information
  -e, --email           provide an email for authentication or registration
  -p, --password        provide a password for authentication or registration
`.trim();

const getAuthenticationManual = () =>
  `
${bold(white("Usage:"))}

  voltron authenticate [OPTION...]

${bold(white("Description:"))}

  authenticate to an account in Voltron system, requires an email [-e] and a password [-p]

${bold(white("Options:"))}

  -h, --help            print usage information
  -e, --email           provide an email for authentication or registration
  -p, --password        provide a password for authentication or registration
`.trim();

const getApplicationDeploymentManual = () =>
  `
${bold(white("Usage:"))}

  voltron deploy [OPTION...]

${bold(white("Description:"))}

  deploy a Voltron application, takes an application name and a path to the project directory as values

${bold(white("Options:"))}

  -h, --help            print usage information
  -a, --application     provide an email for authentication or registration
  -p, --path            provide a password for authentication or registration
`.trim();

const getApplicationLogsRetrievalManual = () =>
  `
${bold(white("Usage:"))}

  voltron logs <APPLICATION_NAME>

${bold(white("Description:"))}

  retrieve provided application logs, requires application to be deployed
`.trim();

const getApplicationsRetrievalManual = () =>
  `
${bold(white("Usage:"))}

  voltron list

${bold(white("Description:"))}

  list joined applications
`.trim();

const manualMap: { [key: string]: () => string } = {
  create: getCreateApplicationManual,
  register: getRegistrationManual,
  authenticate: getAuthenticationManual,
  deploy: getApplicationDeploymentManual,
  list: getApplicationsRetrievalManual,
  logs: getApplicationLogsRetrievalManual,
};

const printManual = (command: string) =>
  console.log(manualMap[command] ? manualMap[command]() : getDefaultManual());

export { printManual };
