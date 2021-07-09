import { ApplicationDock } from "@core";
import axios from "axios";

const createApplicationDock = (): ApplicationDock => ({
  deployApplicationAtTag: ({ id }, { name }, tag) =>
    new Promise((resolve, reject) =>
      axios
        .put(
          `http://192.168.0.43:8000/users/${id}/applications/${name}/deployments/${tag}`
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

export { createApplicationDock };
