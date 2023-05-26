import { Role } from "@acme/db";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  updateToPromoterWithOrganisation: protectedProcedure
    .input(z.object({ clerkId: z.string(), organizationId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Create the promoter field for the user.
      const newPromoter = await ctx.prisma.promoter.create({
        data: {
          user: {
            connect: {
              clerkId: input.clerkId,
            },
          },
        },
        include: {
          user: true,
        },
      });

      // Create the association between the promoter and the organization.
      await ctx.prisma.promoterOrganization.create({
        data: {
          promoterId: newPromoter.id,
          organizationId: input.organizationId,
        },
      });

      // Update the user's role to promoter and associate the promoter.
      return ctx.prisma.user.update({
        where: { clerkId: input.clerkId },
        data: {
          role: Role.PROMOTER,
          promoter: {
            connect: {
              id: newPromoter.id,
            },
          },
        },
      });
    }),
});
