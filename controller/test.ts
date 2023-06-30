import { FastifyReply, FastifyRequest } from "fastify";
import {
  IRouteGetTestBody,
  IRouteGetTestHeaders,
  IRouteGetTestParams,
  IRouteGetTestQuerystring,
} from "../routes";

export const testController = async (
  request: FastifyRequest<{
    Headers: IRouteGetTestHeaders;
    Querystring: IRouteGetTestQuerystring;
    Params: IRouteGetTestParams;
    Body: IRouteGetTestBody;
  }>,
  reply: FastifyReply
) => {
  try {
    const message = request.query.message;
    return reply
      .code(200)
      .send(
        `Yay! Panda API is running. Oh, and by the way, the querystring message is: ${
          message ?? "no message set."
        }`
      );
  } catch (error) {
    return reply.status(500).send(error);
  }
};
