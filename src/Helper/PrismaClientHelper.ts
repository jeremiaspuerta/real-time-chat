import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-var
  var prismaClient: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prismaClient = globalThis.prismaClient ?? prismaClientSingleton();

export default prismaClient;

if (process.env.NODE_ENV !== "production")
  globalThis.prismaClient = prismaClient;
