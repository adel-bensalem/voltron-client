import { isEmailValid } from "./emailValidator";

function areCredentialsValid(email: string, password: string) {
  const isPasswordValid = password.length > 0;
  const isEmailAddressValid = isEmailValid(email);

  return isEmailAddressValid && isPasswordValid;
}

export { areCredentialsValid };
