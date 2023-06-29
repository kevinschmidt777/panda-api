import fastify from "fastify";
import { testRoutes } from "./routes";

// Init the API server.
const server = fastify();

// Register the routes.
server.register(testRoutes);

// Start the server.
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Panda API server is listening at ${address}`);
});
