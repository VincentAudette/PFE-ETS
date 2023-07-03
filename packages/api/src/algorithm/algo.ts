import {Helper} from "./algoHelpers"
import {PrismaClient, Project, StudentOnProject, Trimester} from "@prisma/client";
import {boolean} from "zod";
const prisma = new PrismaClient();


 async function algoCreateGroups(){
     //1. make groups for preapproved
     await preapprovedGroups(); //DONE-ish
     // TODO (needs a rwk of the partners listing once we have what Vincent and I discussed about a string with all emails in 1 string separated by a defined character)
     // TODO ALSO NEEDS to top up teams below 3 + max out teams if possible with loners

     //2. make groups with groups
     // AND 3. include complementary if missing
     await createGroups(); //DONE-ish
     // TODO ALSO NEEDS to top up teams below 3 + max out teams if possible with loners

     //4. make groups with loners that are still unmatched
     await createGroupsForNoPartners(); //NOT STARTED

 }

 async function preapprovedGroups(){
     const projects = await Helper.getProjects();

     projects.forEach(x=> {
         const preapprovedStudents = x.firstChoices.filter(x=> (x.isPreApprovedInPfe));

         //we need fillers
         const studentIds:any[] = [];
         const studentStudent:any[] = [];
         if(preapprovedStudents.length < x.numberOfStudents){
             let need: number = x.numberOfStudents - preapprovedStudents.length;
             //rework this when we actually have all the partners as 1 string separated by ,
             //currently it's not possible to efficiently find a team of X team mates so I'll pick the first regardless of size if
             // need is greater than 3 otherwise I'll just pick loners

             if(need <3){
                 //TODO
                 //need to wait to see whats the alternative to partnerX , currently there's no link
                 const firstStudentChoice= x.firstChoices.filter(x=> (x.partner1 !== "")).pop();
                 if(firstStudentChoice != null){
                 //TODO
                     //need to wait to see whats the alternative to partnerX , currently there's no link
                     let partners = [firstStudentChoice.studentEmail,firstStudentChoice.partner1,firstStudentChoice.partner2,firstStudentChoice.partner3,firstStudentChoice.partner4];
                     //remove nulls
                     partners =  partners.flatMap(f => f ? [f] : []);
                     partners.forEach(p=> {
                         //push all that's not already included
                         if(!studentIds.includes(p)){
                             //TODO push student in studentstudent
                             studentStudent.push();
                             studentIds.push(p);
                         }

                     });
                 //end TODO
                 }
             }else{
                 //TODO partnerX
                 const loners= x.firstChoices.filter(x=> (x.partner1 == "" && x.isPreApprovedInPfe == false));
                 if(loners.length > need){
                     let required = need;
                     let studentChoice = loners.entries().next();
                     while(required != 0 || !studentChoice.done){
                         let isGrouped:boolean = true;
                         let isFirst:boolean = true;
                        while(isGrouped && !studentChoice.done){
                            if(!isFirst)
                                studentChoice = loners.entries().next();
                            isGrouped =  Helper.studentIsGrouped(studentChoice.value.email);
                            isFirst = false;
                        }
                         if(studentChoice != null && !isGrouped){
                             studentIds.push(studentChoice.value.email);
                             studentStudent.push(studentChoice.value.student);
                             required--;
                         }
                     }
                 }else{
                     loners.forEach(loner =>{
                         studentIds.push(loner.studentEmail);
                     })
                 }
             }
         }else{
             //means it's completed off the bat but Dominik said we can add 2 loners
             //TODO partnerX
             const loners= x.firstChoices.filter(x=> (x.partner1 == "" && x.isPreApprovedInPfe == false));
             for (let i = 0; i < 2; i++) {
                 let iterator = loners.entries();
                 let studentChoice = iterator.next();
                 let isGrouped:boolean = true;
                 let isFirst:boolean = true;

                 while(isGrouped && !studentChoice.done){
                     if(!isFirst)
                        studentChoice = iterator.next();
                     isGrouped =  Helper.studentIsGrouped(studentChoice.value.email);
                     isFirst = false;
                 }

                 if(studentChoice != null && !isGrouped){
                     studentIds.push(studentChoice.value.email);
                     studentStudent.push(studentChoice.value.student);
                 }
             }
         }
         preapprovedStudents.forEach(preapproved =>{
             studentIds.push(preapproved.studentEmail);
             studentStudent.push(preapproved.student);
         })
         //ENSURING START OF PROJECT AS WE HAVE PREAPPROVEDS -SAME LOGIC AS TEAMS ONE MAKE A METHOD
         //need loners -> might need to check for 2nd/3rd choices IF team size is smaller than 3
         if(studentIds.length < x.numberOfStudents || studentIds.length < 3)
         {
             //TODO , make a helper function to take a projectId, int(choice #) that will return a student that is :
                // - Selected projectID in #
                // - Alone (no partner identified)
                // - currently isn't grouped
         }
         /*studentIds.forEach(s=>{
             Helper.createStudentProject(s,x.pfeId);
         })*/
         Helper.createStudentProject(studentStudent,x.pfeId);
     });
     throw new Error("not Implemented");
 }
//creation of teams for groups
async function createGroups() {
    const projects = await Helper.getProjects();


    projects.forEach(x=> {
        //need to add a validation on if project ALREADY has a project team -> go next
        //TODO partnerX
        const groupedStudents = x.firstChoices.filter(x=> (x.partner1 !== "" && x.isPreApprovedInPfe == false));
        let hasSante:boolean = false;
        let hasIGEE:boolean = false;
            const studentIds:any[] = [];
            while(studentIds.length < x.numberOfStudents){
                groupedStudents.forEach(z=>{
                    //student already in group formation skip
                    if(studentIds.includes(z.studentEmail)){
                        if(z.isEnergyProfile){
                            hasIGEE = true;
                        }else{
                            hasSante = true;
                        }
                    }
                    if(studentIds.includes(z.studentEmail) || Helper.studentIsGrouped(z.studentEmail) )
                        return;
                    //all possible ids for a single student
                //TODO partnerX
                    let partners = [z.studentEmail,z.partner1,z.partner2,z.partner3,z.partner4];
                    //remove nulls
                    partners =  partners.flatMap(f => f ? [f] : []);
                    //is currentGroup + OtherGroup < limit
                    if(studentIds.length+ partners.length <= x.numberOfStudents){
                        partners.forEach(p=> {
                            //push all that's not already included
                            if(!studentIds.includes(p))
                                studentIds.push(p);
                        })
                    }
                //END TODO
                })
            }
            if(hasSante || hasIGEE){
                //missing a complementary profile.
                if(!hasSante){
                   //TODO partnerX
                   let healthStudents =  x.firstChoices.filter(x=> (x.partner1 == "" && x.isPreApprovedInPfe == false && x.isHealthProfile)).values();
                   let healthStudent = healthStudents.next();
                   let isGrouped:boolean = true;
                    let isFirst:boolean = true;
                   while(isGrouped && !healthStudent.done){
                       if(!isFirst)
                           healthStudent= healthStudents.next();
                       isGrouped = Helper.studentIsGrouped(healthStudent.value.studentEmail);
                       isFirst = false;
                   }
                    if(healthStudent != null && !isGrouped){
                        studentIds.push(healthStudent.value.email);
                    }
                }else if(!hasIGEE){
                    //TODO partnerX
                    let energyStudents =  x.firstChoices.filter(x=> (x.partner1 == "" && x.isPreApprovedInPfe == false && x.isEnergyProfile)).values();
                    let energyStudent = energyStudents.next();
                    let isGrouped:boolean = true;
                    let isFirst:boolean = true;
                    while(isGrouped && !energyStudent.done){
                        if(!isFirst)
                            energyStudent= energyStudents.next();
                        isGrouped = Helper.studentIsGrouped(energyStudent.value.studentEmail);
                        isFirst = false;
                    }
                    if(energyStudent != null && !isGrouped){
                        studentIds.push(energyStudent.value.email);
                    }
                }
            }
            //need loners -> might need to check for 2nd/3rd choices IF team size is smaller than 3
            // -SAME LOGIC AS PREAPPROVED ONE MAKE A METHOD
            if(studentIds.length < x.numberOfStudents || studentIds.length < 3)
            {
                //TODO , make a helper function to take a projectId, int(choice #) that will return a student that is :
                // - Selected projectID in #
                // - Alone (no partner identified)
                // - currently isn't grouped
            }
        //ready to create group
        studentIds.forEach(s=>{
            Helper.createStudentProject(s,x.pfeId);
        })
    })
}

async function createGroupsForNoPartners(){
     //TODO : take a list of all the remainer students and filter them by open projects (no group on project) if student selected it in 1-2-3-4th choice
    // student left without a group will "forcefully" join groups that are unable to start due to not being 3 , if there's none then student will be printed to admin
    throw new Error("not Implemented");
}


