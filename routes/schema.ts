import { Users } from "@prisma/client";

export interface IRouteCommonHeaders {
  Authorization: string;
  user?: Users;
}
