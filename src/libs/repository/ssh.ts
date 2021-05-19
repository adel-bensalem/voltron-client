import { NodeSSH } from "node-ssh";

const connectToHost = (key: string): Promise<NodeSSH> => {
  const connection = new NodeSSH();

  return connection
    .connect({
      host: "192.168.0.43",
      username: "git",
      privateKey: key,
    })
    .then(() => connection);
};

export { connectToHost };
