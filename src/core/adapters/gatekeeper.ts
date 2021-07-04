import { Credentials, Identifiable, User } from "@types";

interface Gatekeeper {
  authenticate(
    credentials: Credentials
  ): Promise<{ user: Identifiable<User>; key: string }>;
  ensureUserPermission(
    user: Identifiable<User>,
    resourceName: string
  ): Promise<void>;
}

export { Gatekeeper };
