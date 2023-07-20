/**
 * This hook is used for authentication. It is called by the server before the request is processed.
 * You can asign the hook onto any route you want to protect.
 */

import { FastifyReply, FastifyRequest } from "fastify";
import { IRouteCommonHeaders } from "../routes";
import { verify } from "jsonwebtoken";
import { jwtSecret } from "../utils/user";
import { Users } from "@prisma/client";
import dbClient from "../utils/database";

interface UsersWithSessionId extends Users {
  sessionId: string;
}

export const authHook = async (
  request: FastifyRequest<{
    Headers: IRouteCommonHeaders;
  }>,
  reply: FastifyReply
) => {
  // Check if the user is authenticated and parse the user into the request object.
  if (!request.headers.authorization)
    return reply
      .status(401)
      .send({ message: "No authorization header provided." });
  // Check if token is valid.
  const jwt = verify(request.headers.authorization, jwtSecret);
  // Check if sessionId is still valid inside of database (if it is not, the user has logged out all sessions).
  const foundSessionId = await dbClient.userSessions.count({
    where: {
      userId: (jwt as UsersWithSessionId).id,
      sessionId: (jwt as UsersWithSessionId).sessionId,
    },
  });
  if (!foundSessionId)
    return reply.status(401).send({ message: "User session expired." });
  if (jwt) {
    request.headers.user = jwt as Users;
  }
};
