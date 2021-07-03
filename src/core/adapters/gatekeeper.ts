import { Credentials, Identifiable, User } from "@types";

interface Gatekeeper {
  authenticate(
    credentials: Credentials
  ): Promise<{ user: Identifiable<User>; key: string }>;
}

export { Gatekeeper };
