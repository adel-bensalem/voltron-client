import axios from "axios";
import { Repository } from "./types";
import { Application } from "../../types/application";

const createRepository = (): Repository => ({
  saveApplication: (application: Application): Promise<Application> =>
    new Promise((resolve, reject) =>
      axios
        .post("http://repository.voltronlabs.com/applications", application)
        .then(() => resolve(application))
        .catch((error) =>
          reject(
            !!error.response
              ? error.response.data
              : !!error.request
              ? error.request
              : error
          )
        )
    ),
});

export { createRepository };
