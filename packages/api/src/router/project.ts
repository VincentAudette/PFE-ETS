import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const projectRouter = router({
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      const profile = ctx.prisma.project.create({
        data: { title: input.title },
      });

      if (profile !== null || profile !== undefined) {
        return profile;
      }
    }),
});
