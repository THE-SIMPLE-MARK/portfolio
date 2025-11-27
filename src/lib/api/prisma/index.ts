import "server-only"

import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "prisma-generated/client"
import env from "~/env"

function createPrismaClient() {
	return new PrismaClient({
		log:
			env.NODE_ENV === "development"
				? ["error", "warn", "info", "query"]
				: ["error"],
		adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
	})
}

declare global {
	var prisma: ReturnType<typeof createPrismaClient> | undefined
}

const _prisma = globalThis.prisma ?? createPrismaClient()
export default _prisma

if (env.NODE_ENV !== "production") globalThis.prisma = _prisma
