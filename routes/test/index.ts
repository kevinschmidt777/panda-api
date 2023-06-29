import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { IRouteGetTestParams, IRouteGetTestQuerystring } from "./schema";

const testRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get<{
    Querystring: IRouteGetTestQuerystring;
    Params: IRouteGetTestParams;
  }>("/test/:id?", {}, async (request, reply) => {
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
  });
};

export default testRoutes;
