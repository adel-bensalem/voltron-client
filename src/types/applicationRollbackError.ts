type ApplicationRollbackError = {
  wasApplicationNotFound: boolean;
  wasTagNotFound: boolean;
  wasSessionNotFound: boolean;
  wasPermissionDenied: boolean;
};

export { ApplicationRollbackError };
