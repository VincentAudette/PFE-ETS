import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const studentRouter = router({
  //create or update student with department and clerkId
  createOrUpdate: protectedProcedure
    .input(
      z.object({
        clerkId: z.string(),
        departmentId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
        where: { clerkId: input.clerkId },
        data: {
          role: "STUDENT",
        },
      });

      const student = await ctx.prisma.student.upsert({
        where: { email: input.email },
        update: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          department: {
            connect: {
              id: input.departmentId,
            },
          },
        },
        create: {
          clerkId: input.clerkId,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          department: {
            connect: {
              id: input.departmentId,
            },
          },
        },
        include: {
          department: true,
        },
      });

      return student;
    }),
});
