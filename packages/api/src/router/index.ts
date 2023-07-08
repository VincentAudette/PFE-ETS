import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { organizationRouter } from "./organization";
import { fileRouter } from "./file";
import { groupRouter } from "./group";
import { projectRouter } from "./project";
import { promoterRouter } from "./promoter";
import { thematicRouter } from "./thematic";
import { studentRouter } from "./student";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  organization: organizationRouter,
  file: fileRouter,
  group: groupRouter,
  project: projectRouter,
  promoter: promoterRouter,
  thematic: thematicRouter,
  student: studentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
