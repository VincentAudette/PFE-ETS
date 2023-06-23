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
  allProjects: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.promoter.findUnique({
      where: {
        userId: ctx.auth.userId,
      },
      include: {
        projects: {
          include: {
            promoter: {
              include: { user: true },
            },
            organization: true,
            files: true,
            thematics: {
              include: {
                thematic: true,
              },
            },
            teachers: {
              include: {
                teacher: true,
              },
            },
            representatives: {
              include: {
                representative: true,
              },
            },
            departments: true,
            states: true,
            group: {
              include: {
                students: {
                  include: {
                    department: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }),
});
