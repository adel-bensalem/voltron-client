import axios from "axios";
import { Repository } from "./types";
import { Application } from "../../types/application";

const createRepository = (): Repository => ({
  saveApplication: (application: Application): Promise<Application> =>
    axios
      .post("http://repository.voltronlabs.com/applications", application)
      .then(() => application),
});

export { createRepository };
