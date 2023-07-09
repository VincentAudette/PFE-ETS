import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { ALL } from "dns";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth.session;
  }),
  getUser: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const profile = ctx.prisma.user.findUnique({
      where: { clerkId: input },
      include: {
        promoter: {
          include: {
            organizations: {
              include: {
                organization: true,
              },
            },
            projects: {
              include: {
                organization: true,
                files: true,
                thematics: true,
                states: true,
                departments: {
                  include: {
                    department: true,
                  },
                },
              },
            },
          },
        },
        admin: {
          include: {
            departments: {
              include: {
                department: {
                  include: {
                    projectRelations: {
                      include: {
                        project: {
                          include: {
                            organization: true,
                            files: true,
                            thematics: true,
                            states: true,
                            departments: {
                              include: {
                                department: true,
                              },
                            },
                          },
                        }
                      }
                    }
                  }
                }
              },
            },
          }
        }
      },
    });

    if (profile !== null || profile !== undefined) {
      return profile;
    }
  }),
});
