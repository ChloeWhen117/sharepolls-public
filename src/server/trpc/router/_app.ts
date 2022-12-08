import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { pollRouter } from "./poll";
import { pollVoteRouter } from "./pollVote";
export const appRouter = router({
  auth: authRouter,
  poll: pollRouter,
  example: exampleRouter,
  vote: pollVoteRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
