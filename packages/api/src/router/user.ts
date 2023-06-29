import { Role } from "@acme/db";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  updateToPromoterWithOrganisation: protectedProcedure
    .input(
      z.object({
        clerkId: z.string(),
        organizationId: z.number(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create the promoter field for the user.
      const newPromoter = await ctx.prisma.promoter.create({
        data: {
          user: {
            connect: {
              clerkId: input.clerkId,
            },
          },
          hasBeenNotified: false,
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
      const updatedUser = await ctx.prisma.user.update({
        where: { clerkId: input.clerkId },
        data: {
          role: Role.PROMOTER,
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          email: input.email,
        },
      });

      return updatedUser;
    }),
});
