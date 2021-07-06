type AuthenticationError = {
  wasSessionNotFound: boolean;
  wasAccountNotFound: boolean;
  isSessionInvalid: boolean;
  areCredentialsInvalid: boolean;
  hasUnExpectedError: boolean;
};

export { AuthenticationError };
