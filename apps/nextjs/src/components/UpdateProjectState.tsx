import { NavigationItem, SecondaryNavigationItem } from "./SideBarLayout";
import SimpleSelect, { SelectOption } from "./Forms/atoms/SimpleSelect";
import { navigation, secondaryNavigation } from "./RoleViews/AdminView";
import { projectStatusMap, projectStatusSelectOptions } from "./ProjectView";
import { Project, ProjectState } from "@acme/db";
import { useState } from "react";
import {
  ProjectCreationState,
  useStateProject,
} from "../context/ProjectStateContext";

function getAllowedStates(currentState: string) {
  switch (currentState) {
    case "DRAFT":
      return ["EVALUATION"];
    case "EVALUTION":
      return ["ACCEPTED", "REJECTED", "APPROBATION"];
    case "INVALID":
      return ["REJECTED", "ADJUSTMENT"];
    default:
      return [];
  }
}

export default function UpdateProjectSate({ project }: { project: Project }) {
  const {
    projectCreationState,
    handlePPEStateFormSubmit,
    selectedState,
    setSelectedState,
    // selectedFile,
    // setSelectedFile,
    // isFileLoading,
    // selectFieldValidationErrors,
    // teachers,
    // setTeachers,
    // representatives,
    // setRepresentatives,
    // students,
    // setStudents,
    // isMultiDepartment,
    // setIsMultiDepartment,
    // otherDepartments,
    // setOtherDepartments,
    // selectedEncouragementType,
    // setSelectedEncouragementType,
    // inputFields,
    // setInputFields,
    // selectedDepartment,
    // setSelectedDepartment,
    // yearOptions,
    // selectedTrimester,
    // setSelectedTrimester,
    // selectedYear,
    // setSelectedYear,
    // selectedThematics,
    // setSelectedThematics,
    // projectId,
  } = useStateProject();

  if (!project) {
    console.log("NULL");
    console.log(project);
    return;
  }
  console.log("NOT NULL");
  console.log("===DEBUG (project)===");
  console.log(project);
  const stateList = project.states as ProjectState[];
  const lastSate = stateList[stateList.length - 1];
  const lastSateStr = lastSate?.state as string;
  let newProjectStateStr = "";
  //   const allowedState = projectStatusSelectOptions;

  const projectStatusSelectOptions: Array<SelectOption> = [];
  const allowedState = [lastSateStr].concat(getAllowedStates(lastSateStr));
  projectStatusMap.forEach((str, projectStatus) => {
    console.log(`${projectStatus}===${allowedState}`);
    if (allowedState.includes(projectStatus)) {
      projectStatusSelectOptions.push({ id: projectStatus, name: str });
    }
  });
  console.log("===DEBUG===");
  console.log(allowedState);
  console.log(projectStatusSelectOptions);
  return (
    <>
      {/* {projectCreationState === ProjectCreationState.LOADING && <LoadingPFE />} */}
      <div>
        <form
          autoComplete="off"
          className="flex flex-col gap-12"
          onSubmit={handlePPEStateFormSubmit}
        >
          <SimpleSelect
            name="state"
            options={projectStatusSelectOptions}
            label={`État du projet`}
            selectedState={projectStatusSelectOptions[0]}
            setSelectedState={setSelectedState}
            // validationError={selectFieldValidationErrors.department}
          />
          <button
            type="submit"
            className="mr-2 mb-2 rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Changer l'état
          </button>
        </form>
      </div>
    </>
  );
}
