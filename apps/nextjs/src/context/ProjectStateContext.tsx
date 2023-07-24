import { toast } from "react-toastify";
import { trpc } from "../utils/trpc";
import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { PFEStateFormElement } from "../components/Forms/PFEForm/helpers";
import { SelectOption } from "../components/Forms/atoms/SimpleSelect";

export enum ProjectCreationState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface ProjectStateContext {
  projectCreationState: ProjectCreationState;
  handlePPEStateFormSubmit: (
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;
  selectedState: SelectOption;
  setSelectedState: Dispatch<SetStateAction<SelectOption>>;
  // selectedFile: UploadFile[] | undefined;
  // setSelectedFile: Dispatch<SetStateAction<UploadFile[] | undefined>>;
  // isFileLoading: boolean;
  // inputFields: PfeFormInputFields;
  // setInputFields: Dispatch<SetStateAction<PfeFormInputFields>>;
  // selectFieldValidationErrors: { [key in SelectKeys]?: boolean };
  // teachers: any[];
  // setTeachers: Dispatch<SetStateAction<any[]>>;
  // representatives: any[];
  // setRepresentatives: Dispatch<SetStateAction<any[]>>;
  // students: any[];
  // setStudents: Dispatch<SetStateAction<any[]>>;
  // selectedTrimester: SelectOption;
  // setSelectedTrimester: Dispatch<SetStateAction<SelectOption>>;
  // selectedYear: SelectOption;
  // setSelectedYear: Dispatch<SetStateAction<SelectOption>>;
  // selectedEncouragementType: SelectOption;
  // setSelectedEncouragementType: Dispatch<SetStateAction<SelectOption>>;
  // selectedDepartment: SelectOption;
  // setSelectedDepartment: Dispatch<SetStateAction<SelectOption>>;
  // isMultiDepartment: boolean;
  // setIsMultiDepartment: Dispatch<SetStateAction<boolean>>;
  // otherDepartments: string[];
  // setOtherDepartments: Dispatch<SetStateAction<string[]>>;
  // yearOptions: SelectOption[];
  // selectedThematics: Set<number>;
  // setSelectedThematics: Dispatch<SetStateAction<Set<number>>>;
  // projectId: string | undefined;
  // setProjectId: Dispatch<SetStateAction<string | undefined>>;
}

const ProjectStateContext = React.createContext<
  ProjectStateContext | undefined
>(undefined);

function ProjectStateProvider({ children }: { children: React.ReactNode }) {
  const [formEvent, setFormEvent] =
    useState<React.FormEvent<HTMLFormElement> | null>(null);

  const [selectedState, setSelectedState] = useState<SelectOption>(
    {} as SelectOption, // SHOULD BE THE FIRST OPTION AVAIBLE HERE, OR THE DEFAULT ONE
  );
  /*yearOptions[0] as SelectOption,*/

  // // Project object containing all the fields for error handling
  // const [inputFields, setInputFields] =
  //   useState<PfeFormInputFields>(pfeFormInputFields);
  // const [selectFieldValidationErrors, setSelectFieldValidationErrors] =
  //   useState<{ [key in SelectKeys]?: boolean }>(selectValidationDefault);

  const [projectCreationState, setProjectCreationState] =
    useState<ProjectCreationState>(ProjectCreationState.IDLE);

  const handlePPEStateFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setProjectCreationState(ProjectCreationState.LOADING);
    setFormEvent(e);

    const target = e.target as PFEStateFormElement;

    let containsErrors = false;

    // let projObjectCopy = { ...inputFields };

    // const keys = Object.keys(projObjectCopy) as FieldKey[];
    // keys.forEach((key) => {
    //   if (
    //     projObjectCopy[key].value == "" &&
    //     projObjectCopy[key].hasOwnProperty("error")
    //   ) {
    //     toast.error(`Le champ ${projObjectCopy[key].label} est obligatoire`);
    //     projObjectCopy = {
    //       ...projObjectCopy,
    //       [key]: {
    //         value: inputFields[key].value,
    //         error: "Ce champ est obligatoire",
    //         label: inputFields[key].label,
    //       },
    //     };
    //     containsErrors = true;
    //   }
    // });

    const projectId = "0";

    console.log("===DEBUG222===");
    console.log(target.state);
    const formData = {
      state: target.state.value,
      projectId: projectId,
      timestamp: new Date(),
    };

    const createProjectSate = trpc.projectState.create.useMutation({
      onSuccess: (data) => {
        toast.success("Succès");
        // setProjectCreationState(ProjectCreationState.SUCCESS);
        // setProjectId(data.id);
        // resetForm();
      },
    });
    await createProjectSate.mutateAsync(formData);
    if (createProjectSate.isError) {
      toast.error("Erreur");
      // setProjectCreationState(ProjectCreationState.ERROR);
    }
  };

  const value = {
    projectCreationState,
    handlePPEStateFormSubmit,
    selectedState,
    setSelectedState,
    // uploadedFile,
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
    // selectedFile,
    // setSelectedFile,
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
    // setProjectId,
  };
  return (
    <ProjectStateContext.Provider value={value}>
      {children}
    </ProjectStateContext.Provider>
  );
}

// const createOrUpdateStudent = trpc.project.createOrUpdate.useMutation();
// 156
function useStateProject() {
  const context = useContext(ProjectStateContext);
  if (context === undefined) {
    throw new Error(
      "useStateProject must be used within a ProjectStateProvider",
    );
  }
  return context;
}

export { ProjectStateProvider, useStateProject };
