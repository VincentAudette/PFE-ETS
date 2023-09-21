import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const groupRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.group.findMany({
      include: {
        project: true,
        students: true
      },
    });
  }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.group.findMany({
      where: { projectId: input },
      include: {
        project: true,
        students: true
      },
    });
  }),
});
