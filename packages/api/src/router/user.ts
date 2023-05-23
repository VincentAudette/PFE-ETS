import { Role } from "@acme/db";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  updateToPromoter: protectedProcedure
    .input(z.object({ clerkId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { clerkId: input.clerkId },
        data: { role: Role.PROMOTER },
      });
    }),
});
