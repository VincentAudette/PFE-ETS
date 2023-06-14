import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { organizationRouter } from "./organization";
import { fileRouter } from "./file";
import { projectRouter } from "./project";
import { promoterRouter } from "./promoter";
import { thematicRouter } from "./thematic";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  organization: organizationRouter,
  file: fileRouter,
  project: projectRouter,
  promoter: promoterRouter,
  thematic: thematicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
