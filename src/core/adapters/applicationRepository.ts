import { Application } from "../../types/application";

interface ApplicationRepository {
  findApplication(application: Application): Promise<Application | null>;
  saveApplication(application: Application): Promise<Application>;
}

export { ApplicationRepository };
