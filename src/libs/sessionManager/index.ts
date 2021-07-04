import { SessionManager } from "@core";
import * as fs from "fs";
import * as os from "os";

const SESSION_FILE = `${os.tmpdir()}/voltron-session`;
const SESSION_KEY = `${os.tmpdir()}/voltron-session-key`;

const createSessionManager = (): SessionManager => ({
  start: (user, key) =>
    new Promise((resolve, reject) =>
      fs.writeFile(SESSION_FILE, JSON.stringify(user), (err) =>
        err
          ? reject(err)
          : fs.writeFile(SESSION_KEY, key, (err) =>
              err ? reject(err) : resolve({ user, key })
            )
      )
    ),
  retrieve: () =>
    new Promise((resolve, reject) =>
      fs.readFile(SESSION_FILE, "utf8", (err, data) => {
        err
          ? reject(err)
          : fs.readFile(SESSION_FILE, "utf8", (err, key) => {
              err
                ? reject(err)
                : resolve({
                    user: JSON.parse(data),
                    key: key.replace(/\n/g, "EOF"),
                  });
            });
      })
    ),
  destroy: () => new Promise((resolve) => fs.rm(SESSION_FILE, () => resolve())),
});

export { createSessionManager };
