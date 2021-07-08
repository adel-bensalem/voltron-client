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
});

export { createDeploymentLog };
