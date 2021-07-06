import { Application, Identifiable, User } from "@types";

interface ApplicationRepository {
  saveApplication(
    application: Application,
    user: Identifiable<User>
  ): Promise<Application>;
  getUserApplications(
    user: Identifiable<User>
  ): Promise<Identifiable<Application>[]>;
}

export { ApplicationRepository };
