import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Database URL is not defined in .env file");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db-new",
  dbCredentials: {
    url: databaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
