type ApplicationDeploymentError = {
  wasSessionNotFound: boolean;
  wasApplicationNotFound: boolean;
  wasApplicationPathInvalid: boolean;
  wasPermissionDenied: boolean;
  hasInvalidRequirements: boolean;
  hasDeploymentFailed: boolean;
};

export { ApplicationDeploymentError };
