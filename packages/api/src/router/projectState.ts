import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const projectStateRouter = router({
  create: protectedProcedure
    .input(
      z.object({ projectId: z.string(), state: z.string(), timestamp: Date }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.projectState.create({
        data: {
          projectId: input.projectId,
          state: input.state as any,
          timestamp: input.timestamp
        },
      });
    }),
});
