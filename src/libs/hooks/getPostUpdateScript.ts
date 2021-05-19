import { Application } from "../../types/application";

const getPostUpdateScript = ({ name }: Application) => `
#!/bin/sh
REPO_PATH=~/tmp/${name}

[ -d "\\$REPO_PATH" ] && sudo rm -rf "\\$REPO_PATH"
git clone ~/${name}.git "\\$REPO_PATH"

sudo docker container stop web 
sudo docker container rm web 
cd "\\$REPO_PATH" && sudo docker build -t web:latest . && sudo docker run -d -p 80:80 --name web web
`;

export { getPostUpdateScript };
