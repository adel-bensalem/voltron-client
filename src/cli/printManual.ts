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
  deployments           list application deployments
  logs                  retrieve provided application logs, requires application to be deployed
  rollback              re deploy an application to a previous version, each deployment is tagged, you can access the with the [deployments] command
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
  -a, --application     application name to deploy
  -p, --path            path to project repository
`.trim();

const getApplicationLogsRetrievalManual = () =>
  `
${bold(white("Usage:"))}

  voltron logs <APPLICATION_NAME>

${bold(white("Description:"))}

  retrieve provided application logs, requires application to be deployed
`.trim();

const getApplicationDeploymentsRetrievalManual = () =>
  `
${bold(white("Usage:"))}

  voltron deployments <APPLICATION_NAME>

${bold(white("Description:"))}

  retrieve provided application deployments
`.trim();

const getApplicationsRetrievalManual = () =>
  `
${bold(white("Usage:"))}

  voltron list

${bold(white("Description:"))}

  list joined applications
`.trim();

const getApplicationRollbackManual = () =>
  `
${bold(white("Usage:"))}

  voltron rollback [OPTION...]

${bold(white("Description:"))}

  re deploy an application to a previous version, each deployment is tagged, you can access the with the [deployments] command
  
${bold(white("Options:"))}

  -h, --help            print usage information
  -a, --application     application name to rollback
  -t, --tag             tag associated with deployment, view with [deployments] command
`.trim();

const manualMap: { [key: string]: () => string } = {
  create: getCreateApplicationManual,
  register: getRegistrationManual,
  authenticate: getAuthenticationManual,
  deploy: getApplicationDeploymentManual,
  list: getApplicationsRetrievalManual,
  logs: getApplicationLogsRetrievalManual,
  deployments: getApplicationDeploymentsRetrievalManual,
  rollback: getApplicationRollbackManual,
};

const printManual = (command: string) =>
  console.log(manualMap[command] ? manualMap[command]() : getDefaultManual());

export { printManual };
