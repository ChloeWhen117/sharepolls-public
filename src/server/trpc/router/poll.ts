import { z } from "zod";
import { add } from "date-fns";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const pollRouter = router({
    getAll: publicProcedure
        .query(async ({ ctx }) => {
        try {
          return await ctx.prisma.polls.findMany();
        } catch (error) {
          console.log("error", error);
        }
      }),
    getByAuthorId: protectedProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            try {
                return await ctx.prisma.poll.findMany({
                    where: { authorId: input.id },
                });
            } catch (error) {
            console.log(error);
            }
        }),
    getByPollId: protectedProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            try {
                return await ctx.prisma.poll.findMany({
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
                options: z.array(
                    z.object({
                        body: z.string()
                    })
                ),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const poll = await ctx.prisma.poll.create({
                    data: {
                        title: input.title,
                        question: input.question,
                        options: {
                            createMany: {
                                data: input.options
                            }
                        },
                        expires: add(new Date(), {hours: 24})
                    }
                });
                return { success: true, poll: poll };
            } catch (error) {
                console.log(error);
            }
        })
});

  