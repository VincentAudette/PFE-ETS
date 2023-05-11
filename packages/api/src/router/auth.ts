import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth.session;
  }),
  getUser: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const profile = ctx.prisma.user.findUnique({
      where: { clerkId: input },
    });

    if (profile !== null || profile !== undefined) {
      return profile;
    }
  }),
});
