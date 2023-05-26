import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const organizationRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.organization.findMany();
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
