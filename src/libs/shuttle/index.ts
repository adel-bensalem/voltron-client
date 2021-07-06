import { Shuttle } from "@core";
import { exec } from "child_process";

const createShuttle = (): Shuttle => ({
  deploy: (key, app) =>
    new Promise((resolve, reject) =>
      exec(
        `git push --repo git@192.168.0.43:/srv/git/${app.name}.git`,
        {
          env: {
            SSH_AUTH_SOCK: process.env.SSH_AUTH_SOCK,
            SSH_ASKPASS: process.env.SSH_ASKPASS,
            SSH_AGENT_PID: process.env.SSH_AGENT_PID,
          },
        },
        (error) => (error ? reject() : resolve())
      )
    ),
});

export { createShuttle };
