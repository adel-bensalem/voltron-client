import axios from "axios";
import { Application, Identifiable, User } from "@types";
import { Repository } from "./types";

const createRepository = (): Repository => ({
  saveAccount: (user): Promise<Identifiable<User>> =>
    new Promise((resolve, reject) =>
      axios
        .post("http://192.168.0.43:8000/users", user)
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
  saveApplication: (application, user): Promise<Application> =>
    new Promise((resolve, reject) =>
      axios
        .post("http://192.168.0.43:8000/applications", { application, user })
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
