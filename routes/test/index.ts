import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { IRouteGetTestParams, IRouteGetTestQuerystring } from "./schema";

/**
 * Panda API uses a index.ts file in each route folder to register the routes for that folder.
 * Below you can see an example of how to register a simple get route, including the schema.
 * The seperate schema file is used to define the types of the routes.
 */

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
