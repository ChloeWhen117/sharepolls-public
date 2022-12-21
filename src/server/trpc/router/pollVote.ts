import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const pollVoteRouter = router({
  getPollVotes: publicProcedure
    .input(
      z.object({
        pollId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.pollVote.findMany({
          where: { pollId: input.pollId },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  getUniqueUserVoteById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.pollVote.findUnique({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  castVote: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        optionId: z.string(),
        pollId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = input;
        if (!userId) {
          throw new Error("You must be signed in");
        }

        const alreadyVoted = await ctx.prisma.pollVote.findFirst({
          where: {
            AND: [{ pollId: input.pollId }, { userId: input.userId }],
          },
        });
        let pollVote;
        if (alreadyVoted) {
          pollVote = await ctx.prisma.pollVote.update({
            where: { id: alreadyVoted.id },
            data: { optionId: input.optionId },
          });
        } else {
          pollVote = await ctx.prisma.pollVote.create({
            data: {
              optionId: input.optionId,
              pollId: input.pollId,
              userId: input.userId,
            },
          });
        }

        return pollVote;
      } catch (error) {
        console.log(error);
      }
    }),
});
