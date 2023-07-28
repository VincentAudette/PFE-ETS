import SimpleSelect, { SelectOption } from "./Forms/atoms/SimpleSelect";
import { projectStatusMap } from "./ProjectView";
import { Project, ProjectState } from "@acme/db";
import { useStateProject } from "../context/ProjectStateContext";
import getAllowedStates from "../utils/projectState";

export default function UpdateProjectSate({ project }: { project: Project }) {
  const {
    projectCreationState,
    handlePPEStateFormSubmit,
    selectedState,
    setSelectedState,
  } = useStateProject();

  if (!project) {
    return;
  }
  const stateList = project.states as ProjectState[];
  const lastSate = stateList[stateList.length - 1];
  const lastSateStr = lastSate?.state as string;
  let newProjectStateStr = "";
  //   const allowedState = projectStatusSelectOptions;

  const projectStatusSelectOptions: Array<SelectOption> = [];
  const allowedState = [lastSateStr].concat(getAllowedStates(lastSateStr));
  projectStatusMap.forEach((str, projectStatus) => {
    if (allowedState.includes(projectStatus)) {
      projectStatusSelectOptions.push({ id: projectStatus, name: str });
    }
  });
  return (
    <>
      {/* {projectCreationState === ProjectCreationState.LOADING && <LoadingPFE />} */}
      <div>
        <form
          autoComplete="off"
          className="flex flex-col gap-12"
          onSubmit={handlePPEStateFormSubmit}
        >
          <input type="hidden" hidden name="projectId" value={project.id} />
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
