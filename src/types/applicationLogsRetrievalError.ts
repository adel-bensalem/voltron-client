type ApplicationLogsRetrievalError = {
  wasApplicationNotFound: boolean;
  isApplicationNotRunning: boolean;
  wasPermissionDenied: boolean;
  wasSessionNotFound: boolean;
};

export { ApplicationLogsRetrievalError };
