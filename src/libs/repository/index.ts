import axios from "axios";
import { Application, Identifiable, User } from "@types";
import { Repository } from "./types";

const createRepository = (): Repository => ({
  saveAccount: (user): Promise<Identifiable<User>> =>
    new Promise((resolve, reject) =>
      axios
        .post("http://repository.voltronlabs.com/users", user)
        .then(({ data }) => resolve(data))
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
  saveApplication: (application: Application): Promise<Application> =>
    new Promise((resolve, reject) =>
      axios
        .post("http://localhost:8000/applications", application)
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
