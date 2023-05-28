import {PrismaClient, ProjectStatus, StudentOnProject, Trimester} from "@prisma/client";

const prisma = new PrismaClient();

export class Helper {
    private static currentTrimester :Trimester = Trimester.SUMMER;
    private static state :ProjectStatus = 'GROUP_CREATION';

    static createStudentProject(studentEmail :string, projectId : string){
        //this doesnt like trimester despite the addition to class? Need debug/research
        //db generate + db push successful 
        const studentProject : StudentOnProject = {
            studentEmail: studentEmail,
            projectId: projectId ,
            hasBeenNotified : false,
            trimester: this.currentTrimester
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

    static  studentIsGrouped(studentEmail :string){
        let isGrouped = false;
        //same here about trimester (same class)
        const results =  prisma.studentOnProject.findFirst({
            where:
                {
                    trimester: this.currentTrimester,
                    studentEmail : studentEmail
                }
        })

        results.then( x =>
            {
                isGrouped = (x != null) ;
            }
        ).catch(x =>{
            //prisma error occured need debugging
            try {
                throw new Error('algoHelper caught a prisma error during function studentIsGrouped');
            } catch (err: unknown) {
                if (err instanceof Error) {
                    return {
                        message: `Things exploded (${err.message})`,
                    };
                }
            }
        })
        return isGrouped;
    }
}