import { NodeSSH } from "node-ssh";

const connectToHost = (key: string): Promise<NodeSSH> => {
  const connection = new NodeSSH();

  return connection
    .connect({
      host: "10.41.177.169",
      username: "git",
      privateKey: key,
    })
    .then(() => connection);
};

export { connectToHost };
