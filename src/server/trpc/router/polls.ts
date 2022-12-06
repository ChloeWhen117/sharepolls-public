import { z } from "zod";

import { router, protectedProcedure, publicProcedure } from "../trpc";

export const pollsRouter = router({
    getAll: publicProcedure
        .query(async ({ ctx }) => {
        try {
          return await ctx.prisma.polls.findMany();
        } catch (error) {
          console.log("error", error);
        }
      }),
    getByUserId: protectedProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            try {
                return await ctx.prisma.polls.findMany({
                    where: { id: input.id },
                });
            } catch (error) {
            console.log(error);
            }
        }),
    createPoll: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                question: z.string(),
                options: z.array(z.string()),
            })
        )
        .mutation(async ({ ctx, input }) => {
        try {
            await ctx.prisma.polls.create({
                data: {
                    title: input.title,
                    question: input.question,
                    options: input.options
                },
            });
        } catch (error) {
            console.log(error);
        }
        }),
});