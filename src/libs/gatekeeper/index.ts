import { Gatekeeper } from "@core";
import axios from "axios";

const createGateKeeper = (): Gatekeeper => ({
  authenticate: (credentials) =>
    new Promise((resolve, reject) =>
      axios
        .get("http://localhost:8000/users", { params: credentials })
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
