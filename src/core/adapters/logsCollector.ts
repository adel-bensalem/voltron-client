interface LogsCollector {
  collectLogs(applicationName: string): Promise<string[]>;
}

export { LogsCollector };
