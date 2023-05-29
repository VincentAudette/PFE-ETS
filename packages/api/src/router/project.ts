import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { EncouragementType, FileType, Trimester } from "@acme/db";
export const projectRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        trimester: z.nativeEnum(Trimester),
        year: z.number(),
        promoterId: z.number(),
        numberOfIterations: z.number(),
        organizationId: z.number().optional(),
        encouragementType: z.nativeEnum(EncouragementType),
        multipleTeams: z.boolean(),
        numberOfTeamsRequested: z.number(),
        numberOfStudents: z.number(),
        isMultidepartment: z.boolean(),
        acceptsConfidentiality: z.boolean(),
        authorizesCloudComputing: z.boolean(),
        authorizesCloudOutsideQuebec: z.boolean(),
        mustRespectRegulations: z.boolean(),
        signatureImg: z
          .object({
            key: z.string(),
            type: z.nativeEnum(FileType),
            url: z.string(),
          })
          .optional(),
        pdfVersion: z.string().optional(),
        isAssignedToTeacher: z.boolean(),
        isSelectedDuringSemester: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.project.create({
        data: {
          pfeId: "PFE", //TODO: generate pfeId number from group created before
          title: input.title,
          description: input.description,
          trimester: input.trimester,
          year: input.year,
          numberOfIterations: input.numberOfIterations,
          encouragementType: input.encouragementType,
          multipleTeams: input.multipleTeams,
          numberOfTeamsRequested: input.numberOfTeamsRequested,
          numberOfStudents: input.numberOfStudents,
          isMultidepartment: input.isMultidepartment,
          acceptsConfidentiality: input.acceptsConfidentiality,
          authorizesCloudComputing: input.authorizesCloudComputing,
          authorizesCloudOutsideQuebec: input.authorizesCloudOutsideQuebec,
          mustRespectRegulations: input.mustRespectRegulations,
          isAssignedToTeacher: input.isAssignedToTeacher,
          isSelectedDuringSemester: input.isSelectedDuringSemester,
          promoter: {
            connect: {
              id: input.promoterId,
            },
          },
          organization: input.organizationId
            ? {
                connect: {
                  id: input.organizationId,
                },
              }
            : undefined,
          pdfVersion: input.pdfVersion ?? undefined,
          signatureImg: input.signatureImg
            ? {
                create: {
                  key: input.signatureImg.key,
                  type: input.signatureImg.type,
                  url: input.signatureImg.url,
                  uploadedAt: new Date(),
                },
              }
            : undefined,
        },
      });
    }),
});
