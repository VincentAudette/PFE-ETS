import {Helper} from "./algoHelpers"
import {PrismaClient, Project, StudentOnProject, Trimester} from "@prisma/client";
const prisma = new PrismaClient();

//creation of teams for groups
async function createGroups() {

    const projects = await Helper.getProjects();

    projects.forEach(x=> {
        const groupedStudents = x.firstChoices.filter(

                x=> (x.partner1 !== ""));

        //lower than max size we can have
        if(groupedStudents.length <= x.numberOfStudents){
            const studentIds:any[] = [];
            groupedStudents.forEach(z=>{
                //student already in group formation skip
                if(studentIds.includes(z.studentEmail))
                    return;
                //all possible ids for a single student
                let partners = [z.studentEmail,z.partner1,z.partner2,z.partner3,z.partner4];
                //remove nulls
                partners =  partners.flatMap(f => f ? [f] : []);
                //is currentGroup + OtherGroup < limit
                if(studentIds.length+ partners.length < groupedStudents.length){
                    partners.forEach(p=> {
                        //push all that's not already included
                        if(!studentIds.includes(p))
                            studentIds.push(p);
                    })
                }
            })
            //ready to create group
            studentIds.forEach(s=>{
                Helper.createStudentProject(s,x.pfeId);
            })

        }else{
            //maximize the groups to be at capacity - The Biggest group + loners? 2 groups to be at max?
            //Question for Dom
        }
    })

}

async function createGroupsForNoPartners(){
    throw new Error("not Implemented")
}


