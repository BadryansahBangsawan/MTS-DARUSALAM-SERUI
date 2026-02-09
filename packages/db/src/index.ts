import dotenv from "dotenv";
import { env } from "@my-better-t-app/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

dotenv.config({ path: "../../apps/web/.env" });

const poolConnection = new Pool({ connectionString: env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export const db = drizzle(poolConnection, { schema });
