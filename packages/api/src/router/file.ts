import { FileType } from "@acme/db";
import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const fileRouter = router({
  byKey: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.file.findFirst({ where: { key: input } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        key: z.string(),
        type: z.enum([
          FileType.AUDIO,
          FileType.IMAGE,
          FileType.PDF,
          FileType.ZIP,
        ]),
        url: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.file.create({
        data: input,
      });
    }),
});
