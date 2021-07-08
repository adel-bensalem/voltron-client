import { Application, Deployment, Identifiable } from "@types";

interface DeploymentLog {
  tagDeployment(application: Application): Promise<Identifiable<Deployment>>;
}

export { DeploymentLog };
