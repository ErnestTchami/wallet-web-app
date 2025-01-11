import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as relations from "./relation";

const databaseUrl = process.env.DATABASE_URL;

const drizzleClient = () => {
  const queryClient = postgres(databaseUrl as string, {
    ssl: { rejectUnauthorized: false },
  });

  const db = drizzle(queryClient, {
    schema: {
      ...schema,
      ...relations,
    },
  });
  return db;
};

declare const globalThis: {
  drizzleGlobal: ReturnType<typeof drizzleClient>;
} & typeof global;

export const db = globalThis.drizzleGlobal ?? drizzleClient;
