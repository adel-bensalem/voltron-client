import { Identifiable, User } from "@types";

interface LogsCollector {
  collectLogs(
    user: Identifiable<User>,
    applicationName: string
  ): Promise<string[]>;
}

export { LogsCollector };
