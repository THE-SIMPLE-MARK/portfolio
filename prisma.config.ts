import "dotenv/config"
import { env, type PrismaConfig } from "prisma/config"

export default {
	schema: "src/lib/api/prisma/schema",
	datasource: {
		url: env("DATABASE_URL"),
	},
} satisfies PrismaConfig
