import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;

const sql = neon(DATABASE_URL!);

export const db = drizzle(sql, { schema });

// export async function initializeDatabase() {
//   try {
//     await Promise.all([
//       schema.setDefaultRoleTrigger(),
//       schema.setupAuditTriggers(),
//     ]);
//   } catch (error) {
//     console.error("Error setting up database triggers:", error);
//   }
// }
