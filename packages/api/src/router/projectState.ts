import { ProjectStatus } from "@acme/db"
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const projectStateRouter = router({
  create: protectedProcedure
    .input(
      z.object({ projectId: z.string(), state: z.nativeEnum(ProjectStatus), timestamp: z.date() }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.projectState.create({
        data: {
          state: input.state,
          timestamp: input.timestamp,
          // projectId: input.projectId,
          project: {
            connect: {
              id: input.projectId,
            },
          },
        },
      });
    }),
});
