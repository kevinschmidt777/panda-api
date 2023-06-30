import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import cors from "@fastify/cors";

import * as routes from "./routes";

// Init the API server.
const server = fastify();

// Regsiter plugins.
server.register(fastifyEnv, { dotenv: true, schema: { type: "object" } });
server.register(cors, { origin: "*" }); // TODO: Change this to the actual domain.

// Start the server.
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Panda API server is listening at ${address}`);
});

// Register the routes.
server.register(routes.authRoutes);
