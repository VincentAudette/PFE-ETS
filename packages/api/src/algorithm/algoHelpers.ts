import {prisma} from "./algo";


export class Helper {
    private static currentTrimester = 'SUMMER';

    static createStudentProject(studentid :string, projectId : string){
        const studentProject = {
            studentId: studentid,
            projectId: projectId.projectId ,
            hasBeenNotified : false
        }
        prisma.StudentOnProject.create({
            data: studentProject
        })
    }
    static getProjects(){

        return prisma.Project.findMany({
            where: {
                trimester: this.currentTrimester,
                ProjectStatus : {
                    state: 'GROUP_CREATION',
                }
            },
            include:{
                trimester: true,
                promoter: true,
                organization: true,
                encouragementType: true,
                teachers: true,
                departments: {
                    type: true,
                },
                thematics: {
                    projectRelations: true,
                },
                students: true,
                states:true ,
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
            }
        })
    }
}