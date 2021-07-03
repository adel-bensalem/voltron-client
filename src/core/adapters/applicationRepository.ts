import { Application, Identifiable, User } from "@types";

interface ApplicationRepository {
  saveApplication(
    application: Application,
    user: Identifiable<User>
  ): Promise<Application>;
}

export { ApplicationRepository };
