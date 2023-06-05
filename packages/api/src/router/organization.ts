import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const organizationRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.organization.findMany({
      include: {
        logo: true,
      },
    });
  }),
  getById: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const organizationId = input;
      const organization = await ctx.prisma.organization.findUnique({
        where: { id: organizationId },
      });
      if (organization !== null) {
        return organization;
      } else {
        throw new Error(`Organization with id ${organizationId} not found`);
      }
    }),
  getByIds: protectedProcedure
    .input(z.array(z.number()).optional())
    .query(async ({ ctx, input }) => {
      const organizationIds = input;
      if (organizationIds === undefined) {
        console.error("organizationIds is undefined");
        return null;
      }
      const organizations = await ctx.prisma.organization.findMany({
        where: { id: { in: organizationIds } },
        include: {
          logo: true,
        },
      });
      if (organizations.length > 0) {
        return organizations;
      } else {
        throw new Error(`Organizations with ids ${organizationIds} not found`);
      }
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string(), logo: z.string(), description: z.string() }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.organization.create({
        data: {
          name: input.name,
          logo: {
            connect: {
              key: input.logo,
            },
          },
          description: input.description,
        },
      });
    }),
});
