import { Gatekeeper } from "@core";
import axios from "axios";

const createGateKeeper = (): Gatekeeper => ({
  authenticate: (credentials) =>
    new Promise((resolve, reject) =>
      axios
        .get("http://192.168.0.43:8000/users", { params: credentials })
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
  ensureUserPermission: (user, resourceName) =>
    new Promise((resolve, reject) =>
      axios
        .get(
          `http://192.168.0.43:3000/users/${user.id}/resources/${resourceName}/permissions?intent=write`
        )
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
});

export { createGateKeeper };
