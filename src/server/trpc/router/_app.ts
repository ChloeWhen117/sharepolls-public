import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { pollsRouter } from "./polls";

export const appRouter = router({
  auth: authRouter,
  polls: pollsRouter,
  example: exampleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
