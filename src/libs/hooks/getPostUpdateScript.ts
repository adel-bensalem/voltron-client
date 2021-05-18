import { Application } from "../../types/application";

const getPostUpdateScript = ({ name }: Application) => `
#!/bin/sh
REPO_PATH=~/tmp/${name}

[ -d "\\$REPO_PATH" ] && sudo rm -rf "\\$REPO_PATH"
git clone ~/${name}.git "\\$REPO_PATH"

[ -f "\\$REPO_PATH/build" ] && sh "\\$REPO_PATH/build"
sh "\\$REPO_PATH/start"
`;

export { getPostUpdateScript };
