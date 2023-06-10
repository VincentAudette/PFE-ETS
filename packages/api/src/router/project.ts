import { nativeEnum, z } from "zod";
import { protectedProcedure, router } from "../trpc";
import {
  DepartementETS,
  EncouragementType,
  Prisma,
  PrismaPromise,
  Representative,
  RepresentativeOnProject,
  Student,
  Teacher,
  TeacherOnProject,
  Trimester,
} from "@acme/db";
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
        departments: z.array(z.object({ id: z.string() })).optional(),
        teachers: z
          .array(
            z.object({
              id: z.string(),
              firstName: z.string(),
              lastName: z.string(),
              email: z.string(),
              phone: z.string(),
            }),
          )
          .optional(),
        representatives: z
          .array(
            z.object({
              id: z.string(),
              firstName: z.string(),
              lastName: z.string(),
              email: z.string(),
              phone: z.string(),
            }),
          )
          .optional(),
        students: z
          .array(
            z.object({
              id: z.string(),
              firstName: z.string(),
              lastName: z.string(),
              email: z.string(),
              department: z.object({
                id: z.string(),
                name: z.string(),
                type: nativeEnum(DepartementETS),
              }),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.create({
        data: {
          pfeId:
            "PFE-" +
            input.promoterId +
            "-" +
            input.year +
            "-" +
            input.trimester,
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

      // link thematics to project
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

      //link department to project
      if (
        input.departments &&
        input.departments.length > 1 &&
        input.isMultiDepartment
      ) {
        await ctx.prisma.departmentOnProject.createMany({
          data: input.departments.map((department) => ({
            projectId: project.id,
            departmentId: department.id,
          })),
        });
      } else if (
        input.departments &&
        input.departments.length > 0 &&
        !input.isMultiDepartment &&
        input.departments[0] !== undefined
      ) {
        await ctx.prisma.departmentOnProject.create({
          data: {
            projectId: project.id,
            departmentId: input.departments[0].id,
          },
        });
      }

      // link teachers to project
      if (input.teachers) {
        const upsertTeachers: PrismaPromise<Teacher>[] = [];
        const createTeachersOnProject: PrismaPromise<TeacherOnProject>[] = [];

        input.teachers.forEach((teacher) => {
          upsertTeachers.push(
            ctx.prisma.teacher.upsert({
              where: { email: teacher.email },
              update: {},
              create: {
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email: teacher.email,
                phone: teacher.phone,
              },
            }),
          );
          createTeachersOnProject.push(
            ctx.prisma.teacherOnProject.create({
              data: {
                contacted: false,
                project: { connect: { id: project.id } },
                teacher: { connect: { email: teacher.email } },
              },
            }),
          );
        });

        await ctx.prisma.$transaction([
          ...upsertTeachers,
          ...createTeachersOnProject,
        ]);
      }

      // link representatives to project
      if (input.representatives) {
        const upsertRepresentatives: PrismaPromise<Representative>[] = [];
        const createRepresentativesOnProject: PrismaPromise<RepresentativeOnProject>[] =
          [];

        input.representatives.forEach((representative) => {
          upsertRepresentatives.push(
            ctx.prisma.representative.upsert({
              where: { email: representative.email },
              update: {},
              create: {
                firstName: representative.firstName,
                lastName: representative.lastName,
                email: representative.email,
                phone: representative.phone,
              },
            }),
          );
          createRepresentativesOnProject.push(
            ctx.prisma.representativeOnProject.create({
              data: {
                project: { connect: { id: project.id } },
                representative: { connect: { email: representative.email } },
              },
            }),
          );
        });

        await ctx.prisma.$transaction([
          ...upsertRepresentatives,
          ...createRepresentativesOnProject,
        ]);
      }

      // link students to group
      if (input.students) {
        const group = await ctx.prisma.group.create({
          data: {
            projectId: project.id,
          },
        });

        const upsertStudents: PrismaPromise<Student>[] = input.students.map(
          (student) =>
            ctx.prisma.student.upsert({
              where: { email: student.email },
              update: { group: { connect: { id: group.id } } },
              create: {
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                group: { connect: { id: group.id } },
                department: {
                  connect: {
                    id: student.department.id,
                  },
                },
              },
            }),
        );

        await ctx.prisma.$transaction(upsertStudents);
      }

      return project;
    }),
});
