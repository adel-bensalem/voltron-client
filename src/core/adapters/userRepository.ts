import { Credentials, Identifiable, User } from "@types";

interface UserRepository {
  saveAccount(user: User): Promise<Identifiable<User>>;
  findUser(credentials: Credentials): Promise<User>;
}

export { UserRepository };
