import { Application, Deployment, Identifiable, User } from "@types";

interface DeploymentLog {
  tagDeployment(application: Application): Promise<Identifiable<Deployment>>;
  retrieveDeployments(
    user: Identifiable<User>,
    application: Application
  ): Promise<Identifiable<Deployment>[]>;
}

export { DeploymentLog };
