/**
 * This hook is used for authentication. It is called by the server before the request is processed.
 * You can asign the hook onto any route you want to protect.
 */

import { FastifyReply, FastifyRequest } from "fastify";
import { IRouteCommonHeaders } from "../routes";
import { verify } from "jsonwebtoken";
import { jwtSecret } from "../utils/user";
import { Users } from "@prisma/client";

export const authHook = async (
  request: FastifyRequest<{
    Headers: IRouteCommonHeaders;
  }>,
  reply: FastifyReply
) => {
  // Check if the user is authenticated and parse the user into the request object.
  if (!request.headers.authorization)
    return reply.status(401).send("No authorization header provided.");
  const jwt = verify(request.headers.authorization, jwtSecret);
  if (jwt) {
    request.headers.user = jwt as Users;
  }
};
