import { z } from "zod";
import { add } from "date-fns";
import { router, publicProcedure } from "../trpc";

export const pollRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.poll.findMany({
        include: { voteCounts: true, options: { include: { PollVote: true } } },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),
  getByAuthorId: publicProcedure
    .input(
      z.object({
        authorId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.poll.findMany({
          include: {
            voteCounts: true,
            options: { include: { PollVote: true } },
          },
          where: { authorId: input.authorId },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  getByPollId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.poll.findUnique({
          include: {
            voteCounts: true,
            options: { include: { PollVote: true } },
          },
          where: { id: input.id },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  createPoll: publicProcedure
    .input(
      z.object({
        authorId: z.string(),
        title: z.string(),
        question: z.string(),
        options: z.array(
          z.object({
            body: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const poll = await ctx.prisma.poll.create({
          data: {
            authorId: input.authorId,
            title: input.title,
            question: input.question,
            options: {
              createMany: {
                data: input.options,
              },
            },
            expires: add(new Date(), { hours: 24 }),
          },
        });
        return poll;
      } catch (error) {
        console.log(error);
      }
    }),
  deletePoll: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.poll.delete({
          where: { id: input.id },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
