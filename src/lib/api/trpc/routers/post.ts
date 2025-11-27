import { z } from "zod"

import { createTRPCRouter } from "~/lib/api/trpc"
import { publicProcedure } from "~/lib/api/trpc/procedures/public"

export const postRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			}
		}),

	create: publicProcedure
		.input(z.object({ name: z.string().min(1) }))
		.mutation(async ({ input }) => {
			return {
				id: "1",
				name: input.name,
			}
		}),

	getLatest: publicProcedure.query(async () => {
		return null
	}),
})
