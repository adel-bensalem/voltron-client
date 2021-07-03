import { Identifiable, User } from "@types";

interface SessionManager {
  start(
    user: Identifiable<User>,
    key: string
  ): Promise<{ user: Identifiable<User>; key: string }>;
  retrieve(): Promise<{ user: Identifiable<User>; key: string }>;
  destroy(): Promise<void>;
}

export { SessionManager };
