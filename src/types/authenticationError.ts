type AuthenticationError = {
  wasSessionNotFound: boolean;
  isSessionInvalid: boolean;
  areCredentialsInvalid: boolean;
  hasUnExpectedError: boolean;
};

export { AuthenticationError };
