type App = {
  name: string;
  path: string;
  tag: string;
};

interface Shuttle {
  deploy(key: string, app: App): Promise<void>;
}

export { Shuttle };
