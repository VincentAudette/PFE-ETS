import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { organizationRouter } from "./organization";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  user: userRouter,
  organization: organizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
