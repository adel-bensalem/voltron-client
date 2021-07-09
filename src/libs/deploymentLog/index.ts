import { DeploymentLog } from "@core";
import axios from "axios";

const createDeploymentLog = (): DeploymentLog => ({
  tagDeployment: ({ name }) =>
    new Promise((resolve, reject) =>
      axios
        .post(`http://192.168.0.43:8000/applications/${name}/deployments`)
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
  retrieveDeployments: (user, { name }) =>
    new Promise((resolve, reject) =>
      axios
        .get(
          `http://192.168.0.43:8000/users/${user.id}/applications/${name}/deployments`
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

export { createDeploymentLog };
