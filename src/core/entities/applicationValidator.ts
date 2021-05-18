import { Application } from "../../types/application";

const isApplicationValid = (application: Application): boolean =>
  application.name.length > 0;

export { isApplicationValid };
