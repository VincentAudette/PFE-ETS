import { DepartementETS } from "@acme/db";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const thematicRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.thematic.findMany();
  }),
  byDepartment: protectedProcedure
    .input(z.nativeEnum(DepartementETS))
    .query(async ({ ctx, input }) => {
      const department = await ctx.prisma.department.findFirst({
        where: {
          type: input,
        },
      });

      if (!department) {
        throw new Error(`Department not found: ${input}`);
      }

      return ctx.prisma.thematic.findMany({
        where: {
          departmentId: department.id,
        },
      });
    }),
});
