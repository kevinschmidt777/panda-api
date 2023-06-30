export const jwtSecret = "p4nd4Ap!S3cr3t";

export const userStrippedSensitiveData = (user: any) => {
  const { password, ...rest } = user;
  return rest;
};
