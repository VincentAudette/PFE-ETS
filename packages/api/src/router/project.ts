import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { EncouragementType, Prisma, Trimester } from "@acme/db";
export const projectRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany({
      include: {
        promoter: {
          include: { user: true },
        },
        organization: true,
        files: true,
        thematics: true,
      },
    });
  }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.project.findUnique({
      where: { id: input },
      include: {
        promoter: {
          include: { user: true },
        },
        organization: true,
        files: true,
        thematics: true,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        trimester: z.nativeEnum(Trimester),
        year: z.number(),
        promoterId: z.number(),
        organizationId: z.number().optional(),
        encouragementType: z.nativeEnum(EncouragementType),
        isMultipleTeams: z.boolean(),
        numberOfTeamsRequested: z.number(),
        numberOfStudents: z.number(),
        isMultiDepartment: z.boolean(),
        acceptsConfidentiality: z.boolean(),
        authorizesCloudComputing: z.boolean(),
        authorizesCloudOutsideQuebec: z.boolean(),
        mustRespectRegulations: z.boolean(),
        signatureImg: z.string(),
        requiredSkills: z.string(),
        contextProblematic: z.string(),
        expectedResults: z.string(),
        needsConstraints: z.string(),
        objectives: z.string(),
        thematics: z.array(z.number()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.create({
        data: {
          pfeId: "PFE-" + input.promoterId + input.year + "-" + input.trimester,
          title: input.title,
          description: input.description,
          trimester: input.trimester,
          year: input.year,
          encouragementType: input.encouragementType,
          isMultipleTeams: input.isMultipleTeams,
          numberOfTeamsRequested: input.numberOfTeamsRequested,
          numberOfStudents: input.numberOfStudents,
          isMultiDepartment: input.isMultiDepartment,
          acceptsConfidentiality: input.acceptsConfidentiality,
          authorizesCloudComputing: input.authorizesCloudComputing,
          authorizesCloudOutsideQuebec: input.authorizesCloudOutsideQuebec,
          mustRespectRegulations: input.mustRespectRegulations,
          requiredSkills: input.requiredSkills,
          contextProblematic: input.contextProblematic,
          expectedResults: input.expectedResults,
          needsConstraints: input.needsConstraints,
          objectives: input.objectives,
          promoter: {
            connect: {
              id: input.promoterId,
            },
          },
          organization: {
            connect: {
              id: input.organizationId,
            },
          },
          files: {
            connect: [
              {
                key: input.signatureImg,
              } as Prisma.FileWhereUniqueInput,
            ],
          },
        },
      });

      if (input.thematics) {
        await ctx.prisma.thematicOnProject.createMany({
          data: input.thematics.map((thematicId) => ({
            projectId: project.id,
            thematicId,
          })),
        });
      }

      // Creating the initial project state
      await ctx.prisma.projectState.create({
        data: {
          projectId: project.id,
          state: "EVALUATION", // Set the initial state to EVALUATION
        },
      });

      return project;
    }),
});
