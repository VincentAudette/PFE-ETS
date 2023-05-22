import { PrismaClient } from "@prisma/client";
import {Helper} from "./algoHelpers"

export const prisma =
    global.prisma ||
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    });

//creation of teams for groups
async function createGroups() {
    const currentTrimester = 'SUMMER';
    const projects = Helper.getProjects();

    projects.forEach(x => {
        const groupedStudents = x.firstChoices.findAll({
            where: {
                partner1: !null,
            }
        })

        //lower than max size we can have
        if(groupedStudents.size <= x.numberOfStudents){
            const studentIds = [];
            groupedStudents.forEach(z=>{
                //student already in group formation skip
                if(studentIds.includes(z.studentId))
                    return;
                //all possible ids for a single student
                let partners = [z.studentId,z.partner1,z.partner2,z.partner3,z.partner4];
                //remove nulls
                partners =  partners.flatMap(f => f ? [f] : []);
                //is currentGroup + OtherGroup < limit
                if(studentIds.length+ partners.length < groupedStudents.size){
                    partners.forEach(p=> {
                        //push all that's not already included
                        if(!studentIds.includes(p))
                            studentIds.push(p);
                    })
                }
            })
            //ready to create group
            studentIds.forEach(s=>{
                Helper.createStudentProject(s,x.projectId);
            })

        }else{
            //maximize the groups to be at capacity - The Biggest group + loners? 2 groups to be at max?
            //Question for Dom
        }
    })

}

