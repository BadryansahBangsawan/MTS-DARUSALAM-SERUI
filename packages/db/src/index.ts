import dotenv from "dotenv";
import { env } from "@my-better-t-app/env/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as schema from "./schema";

dotenv.config({ path: "../../apps/web/.env" });

const poolConnection = mysql.createPool(env.DATABASE_URL);

export const db = drizzle(poolConnection, { schema, mode: "default" });
