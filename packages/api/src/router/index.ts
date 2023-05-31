import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { organizationRouter } from "./organization";
import { fileRouter } from "./file";
import { projectRouter } from "./project";
import { promoterRouter } from "./promoter";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  user: userRouter,
  organization: organizationRouter,
  file: fileRouter,
  project: projectRouter,
  promoter: promoterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
