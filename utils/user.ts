export const jwtSecret = process.env.API_SECRET ?? "secret";

export const userStrippedSensitiveData = (user: any) => {
  const { password, ...rest } = user;
  return rest;
};
