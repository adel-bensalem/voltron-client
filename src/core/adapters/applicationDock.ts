import { Application, Deployment, Identifiable, User } from "@types";

interface ApplicationDock {
  deployApplicationAtTag(
    user: Identifiable<User>,
    application: Application,
    tag: string
  ): Promise<Identifiable<Deployment>>;
}

export { ApplicationDock };
