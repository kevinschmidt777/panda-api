/**
 * Panda API uses a routes.ts file in each route folder to register the routes for that folder.
 * Below you can see an example of how to set-up a simple get route and its controller.
 * The seperate schema file is used to define the types of the route. They are used inside of the controller as types.
 */

import { FastifyInstance, FastifyPluginAsync } from "fastify";
import {
  authChangePwController,
  authLoginController,
  authSignUpController,
} from "../../controller";
import { authHook } from "../../hooks";

export const authRoutes: FastifyPluginAsync = async (
  server: FastifyInstance
) => {
  server.post("/auth/signup", {}, authSignUpController);
  server.post("/auth/login", {}, authLoginController);
  server.post(
    "/auth/changepw",
    {
      preValidation: authHook,
    },
    authChangePwController
  );
};
