interface RequirementsChecker {
  checkDeploymentRequirements(app: {
    name: string;
    path: string;
  }): Promise<void>;
}

export { RequirementsChecker };
