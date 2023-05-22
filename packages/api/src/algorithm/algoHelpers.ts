import {PrismaClient, ProjectStatus, StudentOnProject, Trimester} from "@prisma/client";

const prisma = new PrismaClient();

export class Helper {
    private static currentTrimester :Trimester = 'SUMMER';
    private static state :ProjectStatus = 'GROUP_CREATION';

    static createStudentProject(studentEmail :string, projectId : string){
        const studentProject : StudentOnProject = {
            studentEmail: studentEmail,
            projectId: projectId ,
            hasBeenNotified : false
        }
        prisma.studentOnProject.create({
            data: studentProject
        })
    }
    static async  getProjects(){
        return  prisma.project.findMany({
            where: {
                trimester: this.currentTrimester,
            },
            include:{
                promoter: true,
                organization: true,
                teachers: true,
                departments: true,
                thematics: true,
                students: true,
                firstChoices: {
                    include: {
                        student: true,
                    }
                },
                secondChoices:{include: {
                        student: true,
                    }},
                thirdChoices:{include: {
                        student: true,
                    }},
                fourthChoices:{include: {
                        student: true,
                    }},
                representativeRelations: true,
                states : {
                    where: {state: this.state,}
                }
            }
        })
    }
}