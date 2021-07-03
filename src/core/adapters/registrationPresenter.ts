import { Identifiable, RegistrationError, User } from "@types";

interface RegistrationPresenter {
  presentRegistrationRequest(user: User): void;
  presentRegistrationSuccess(user: Identifiable<User>): void;
  presentRegistrationFailure(error: RegistrationError, user: User): void;
}

export { RegistrationPresenter };
