import { SessionManager } from "@core";
import temp from "temp";
import * as fs from "fs";

const createSessionManager = (): SessionManager => ({
  start: (user, key) =>
    new Promise((resolve, reject) =>
      temp.open("voltron", (err, result) => {
        if (err) return reject(err);

        fs.write(result.fd, JSON.stringify({ user, key }), reject);
        fs.close(result.fd, reject);
        resolve({ user, key });
      })
    ),
  retrieve: () =>
    new Promise((resolve, reject) =>
      temp.open("voltron", (err, result) => {
        if (err) return reject(err);

        fs.readFile(result.path, "utf8", (err, data) =>
          err ? reject(err) : resolve(JSON.parse(data))
        );
      })
    ),
  destroy: () => {
    temp.cleanupSync();
    return Promise.resolve();
  },
});

export { createSessionManager };
