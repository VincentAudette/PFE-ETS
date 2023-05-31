import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const promoterRouter = router({
  associateWithOrganization: protectedProcedure
    .input(
      z.object({
        promoterId: z.number(),
        organizationId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { promoterId, organizationId } = input;

      const association = await ctx.prisma.promoterOrganization.create({
        data: {
          promoterId: promoterId,
          organizationId: organizationId,
        },
      });

      return association;
    }),
});
