import { FastifyReply, FastifyRequest } from "fastify";
import {
  IRouteCommonHeaders,
  IRoutePostAuthLoginBody,
  IRoutePostAuthSignUpBody,
  IRoutePostChangePwBody,
} from "../routes";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import dbClient from "../utils/database";
import { jwtSecret, userStrippedSensitiveData } from "../utils";

export const authSignUpController = async (
  request: FastifyRequest<{
    Body: IRoutePostAuthSignUpBody;
  }>,
  reply: FastifyReply
) => {
  try {
    const hashedPw = await hash(request.body.password, 10);
    await dbClient.users.create({
      data: {
        email: request.body.email,
        password: hashedPw,
      },
    });
    return reply.code(200).send({ message: "New user created successfully." });
  } catch (error) {
    return reply.send(error);
  }
};

export const authLoginController = async (
  request: FastifyRequest<{
    Body: IRoutePostAuthLoginBody;
  }>,
  reply: FastifyReply
) => {
  try {
    const data = await dbClient.users.findUniqueOrThrow({
      where: {
        email: request.body.email,
      },
    });
    const match = await compare(request.body.password, data.password);
    if (match) {
      const jwt = sign(userStrippedSensitiveData(data), jwtSecret, {
        expiresIn: "1w",
      });
      return reply.code(200).send(jwt);
    }
    return reply.code(401).send("Wrong credentials.");
  } catch (error) {
    return reply.send(error);
  }
};

export const authChangePwController = async (
  request: FastifyRequest<{
    Headers: IRouteCommonHeaders;
    Body: IRoutePostChangePwBody;
  }>,
  reply: FastifyReply
) => {
  try {
    const dbUser = await dbClient.users.findUniqueOrThrow({
      where: {
        id: request.headers.user?.id,
      },
    });
    const verified = await compare(request.body.oldPassword, dbUser.password);
    if (!verified)
      return reply.code(401).send({ message: "Wrong credentials." });
    const newHashedPw = await hash(request.body.newPassword, 10);
    await dbClient.users.update({
      where: {
        id: dbUser.id,
      },
      data: {
        password: newHashedPw,
      },
    });
    return reply.code(200).send({ message: "Password changed." });
  } catch (error) {
    return reply.send(error);
  }
};
