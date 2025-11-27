import { z } from "zod"

import { createTRPCRouter } from "~/lib/api/trpc"
import { publicProcedure } from "~/lib/api/trpc/procedures/public"
import prisma from "~/lib/api/prisma"

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
			return prisma.post.create({
				data: {
					name: input.name,
				},
			})
		}),

	getLatest: publicProcedure.query(async () => {
		const post = await prisma.post.findFirst({
			orderBy: { createdAt: "desc" },
		})

		return post ?? null
	}),
})
