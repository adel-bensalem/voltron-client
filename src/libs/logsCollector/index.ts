import axios from "axios";
import { LogsCollector } from "@core";

const createLogsCollector = (): LogsCollector => ({
  collectLogs: (name) =>
    new Promise<string[]>((resolve, reject) =>
      axios
        .get(`http://192.168.0.43:8000/applications/${name}/logs`)
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

export { createLogsCollector };
