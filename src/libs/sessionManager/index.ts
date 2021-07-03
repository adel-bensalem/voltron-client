import { SessionManager } from "@core";
import * as fs from "fs";
import * as os from "os";

const SESSION_FILE = `${os.tmpdir()}/voltron-session`;

const createSessionManager = (): SessionManager => ({
  start: (user, key) =>
    new Promise((resolve, reject) =>
      fs.writeFile(SESSION_FILE, JSON.stringify({ user, key }), (err) =>
        err ? reject(err) : resolve({ user, key })
      )
    ),
  retrieve: () =>
    new Promise((resolve, reject) =>
      fs.readFile(SESSION_FILE, "utf8", (err, data) => {
        err ? reject(err) : resolve(JSON.parse(data));
      })
    ),
  destroy: () => new Promise((resolve) => fs.rm(SESSION_FILE, () => resolve())),
});

export { createSessionManager };
