import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const pollVoteRouter = router({
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
        const pollVote = await ctx.prisma.pollVote.create({
          data: {
            userId: input.userId,
            optionId: input.optionId,
            pollId: input.pollId,
          },
        });
        return { success: true, pollVote: pollVote };
      } catch (error) {
        console.log(error);
      }
    }),
});
