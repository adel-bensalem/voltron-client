import { Application } from "../../types/application";

interface ApplicationRepository {
  saveApplication(application: Application): Promise<Application>;
}

export { ApplicationRepository };
