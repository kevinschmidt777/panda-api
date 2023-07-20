export const jwtSecret = process.env.API_SECRET ?? "secret";

export const jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? "1w";

export const userStrippedSensitiveData = (user: any) => {
  const { password, ...rest } = user;
  return rest;
};
