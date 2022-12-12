import { router } from "../trpc";
import { authRouter } from "./auth";
import { pollRouter } from "./poll";
import { pollVoteRouter } from "./pollVote";
export const appRouter = router({
  auth: authRouter,
  poll: pollRouter,
  vote: pollVoteRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
