import { AuthenticationError, Identifiable, User } from "@types";

interface AuthenticationPresenter {
  presentAuthenticationRequest(): void;
  presentAuthenticationSuccess(user: Identifiable<User>, key: string): void;
  presentAuthenticationFailure(error: AuthenticationError): void;
}
export { AuthenticationPresenter };
