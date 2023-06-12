import { EncouragementType, Trimester } from "@acme/db";
import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { usePFEAuth } from "./PFEAuthContext";
import {
  FieldKey,
  PFEFormElement,
  PfeFormInputFields,
  SelectKeys,
  department,
  encouragementTypes,
  pfeFormInputFields,
  selectValidationDefault,
  trimesters,
  years,
} from "../components/Forms/PFEForm/helpers";
import { SelectOption } from "../components/Forms/atoms/SimpleSelect";
import { trpc } from "../utils/trpc";
import { toast } from "react-toastify";

type UploadFile = { fileUrl: string; fileKey: string };

export enum ProjectCreationState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface ProjectContext {
  projectCreationState: ProjectCreationState;
  handlePFEFormSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  selectedFile: UploadFile[] | undefined;
  setSelectedFile: Dispatch<SetStateAction<UploadFile[] | undefined>>;
  isFileLoading: boolean;
  inputFields: PfeFormInputFields;
  setInputFields: Dispatch<SetStateAction<PfeFormInputFields>>;
  selectFieldValidationErrors: { [key in SelectKeys]?: boolean };
  teachers: any[];
  setTeachers: Dispatch<SetStateAction<any[]>>;
  representatives: any[];
  setRepresentatives: Dispatch<SetStateAction<any[]>>;
  students: any[];
  setStudents: Dispatch<SetStateAction<any[]>>;
  selectedTrimester: SelectOption;
  setSelectedTrimester: Dispatch<SetStateAction<SelectOption>>;
  selectedYear: SelectOption;
  setSelectedYear: Dispatch<SetStateAction<SelectOption>>;
  selectedEncouragementType: SelectOption;
  setSelectedEncouragementType: Dispatch<SetStateAction<SelectOption>>;
  selectedDepartment: SelectOption;
  setSelectedDepartment: Dispatch<SetStateAction<SelectOption>>;
  isMultiDepartment: boolean;
  setIsMultiDepartment: Dispatch<SetStateAction<boolean>>;
  otherDepartments: string[];
  setOtherDepartments: Dispatch<SetStateAction<string[]>>;
  yearOptions: SelectOption[];
  selectedThematics: Set<number>;
  setSelectedThematics: Dispatch<SetStateAction<Set<number>>>;
}

const ProjectContext = React.createContext<ProjectContext | undefined>(
  undefined,
);

// Default values for present + three upcoming years
const yearOptions = years();

function ProjectProvider({ children }: { children: React.ReactNode }) {
  // User data and selected organization
  const { userData, selectedOrganization } = usePFEAuth();

  // Project object containing all the fields for error handling
  const [inputFields, setInputFields] =
    useState<PfeFormInputFields>(pfeFormInputFields);
  const [selectFieldValidationErrors, setSelectFieldValidationErrors] =
    useState<{ [key in SelectKeys]?: boolean }>(selectValidationDefault);

  // Associated teachers, representatives and students
  const [teachers, setTeachers] = useState<any[]>([]);
  const [representatives, setRepresentatives] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  // Trimester
  const [selectedTrimester, setSelectedTrimester] = useState<SelectOption>(
    trimesters[0] as SelectOption,
  );

  // Year

  const [selectedYear, setSelectedYear] = useState<SelectOption>(
    yearOptions[0] as SelectOption,
  );

  // EncouragementType
  const [selectedEncouragementType, setSelectedEncouragementType] =
    useState<SelectOption>(encouragementTypes[0] as SelectOption);

  // Department(s)
  const [selectedDepartment, setSelectedDepartment] = useState<SelectOption>(
    department[0] as SelectOption,
  );
  const [isMultiDepartment, setIsMultiDepartment] = useState<boolean>(false);
  const [otherDepartments, setOtherDepartments] = useState<string[]>([]);

  // File
  const [selectedFile, setSelectedFile] = useState<UploadFile[] | undefined>(
    undefined,
  );
  // The fileKey is present so fetching the file might not be necessary
  const { data: uploadedFile, isLoading: isFileLoading } =
    trpc.file.byKey.useQuery(selectedFile?.[0]?.fileKey as string, {
      enabled: selectedFile != undefined && selectedFile[0] != undefined,
    });

  // Thematics
  const [selectedThematics, setSelectedThematics] = useState<Set<number>>(
    new Set(),
  );

  // Project creation mutation
  const createProject = trpc.project.create.useMutation({
    onSuccess: () => {
      toast.success("Projet créé avec succès");
      setProjectCreationState(ProjectCreationState.SUCCESS);
      resetForm();
    },
  });

  const resetForm = () => {
    //clear the form
    setInputFields(pfeFormInputFields);
    setSelectedFile(undefined);
    setSelectedThematics(new Set());
    setSelectedDepartment(department[0] as SelectOption);
    setSelectedTrimester(trimesters[0] as SelectOption);
    setSelectedYear(years()[0] as SelectOption);
    setSelectedEncouragementType(encouragementTypes[0] as SelectOption);
    setTeachers([]);
    setStudents([]);
    setRepresentatives([]);
    formEvent?.currentTarget.reset();
  };

  const [projectCreationState, setProjectCreationState] =
    useState<ProjectCreationState>(ProjectCreationState.IDLE);

  const [formEvent, setFormEvent] =
    useState<React.FormEvent<HTMLFormElement> | null>(null);

  // Handle form submit and error handling for required fields
  const handlePFEFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProjectCreationState(ProjectCreationState.LOADING);
    setFormEvent(e);

    const target = e.target as PFEFormElement;

    let containsErrors = false;

    let projObjectCopy = { ...inputFields };

    const keys = Object.keys(projObjectCopy) as FieldKey[];

    //Error handling

    keys.forEach((key) => {
      if (
        projObjectCopy[key].value == "" &&
        projObjectCopy[key].hasOwnProperty("error")
      ) {
        toast.error(`Le champ ${projObjectCopy[key].label} est obligatoire`);
        projObjectCopy = {
          ...projObjectCopy,
          [key]: {
            value: inputFields[key].value,
            error: "Ce champ est obligatoire",
            label: inputFields[key].label,
          },
        };
        containsErrors = true;
      }

      if (
        projObjectCopy[key].value != "" &&
        projObjectCopy[key].hasOwnProperty("error")
      ) {
        projObjectCopy = {
          ...projObjectCopy,
          [key]: {
            value: inputFields[key].value,
            error: "",
            label: inputFields[key].label,
          },
        };
      }
    });

    const selectFields: Record<SelectKeys, SelectOption> = {
      trimester: selectedTrimester,
      year: selectedYear,
      encouragementType: selectedEncouragementType,
      department: selectedDepartment,
    };

    const selectChoices: { key: SelectKeys; displayName: string }[] = [
      {
        key: "trimester",
        displayName: "trimestre",
      },
      {
        key: "year",
        displayName: "année",
      },
      {
        key: "encouragementType",
        displayName: "type d'encadrement",
      },
      {
        key: "department",
        displayName: "département",
      },
    ];

    selectChoices.forEach((selectChoice) => {
      if (
        selectFields[selectChoice.key].id.includes("0") &&
        selectFields[selectChoice.key].name.includes("Choisir")
      ) {
        // Check if 'id' is empty or not defined
        toast.error(`Le champ ${selectChoice.displayName} est obligatoire`);
        setSelectFieldValidationErrors((prevErrors) => ({
          ...prevErrors,
          [selectChoice.key]: true,
        }));
        containsErrors = true;
      } else {
        setSelectFieldValidationErrors((prevErrors) => ({
          ...prevErrors,
          [selectChoice.key]: false,
        }));
      }
    });

    if (containsErrors) {
      setInputFields(projObjectCopy);
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setProjectCreationState(ProjectCreationState.IDLE);
      return;
    }
    if (selectedFile == undefined || selectedFile[0] == undefined) {
      toast.error("Veuillez ajouter une signature");
      setProjectCreationState(ProjectCreationState.IDLE);
      return;
    }

    const formData = {
      acceptsConfidentiality: target.acceptsConfidentiality.checked,
      authorizesCloudComputing: target.authorizesCloudComputing.checked,
      authorizesCloudOutsideQuebec: target.authorizesCloudOutsideQuebec.checked,
      mustRespectRegulations: target.mustRespectRegulations.checked,
      title: target.projectTitle.value,
      numberOfStudents: Number.parseInt(target.numberOfStudents.value),
      numberOfTeamsRequested: Number.parseInt(target.numberOfTeams.value),
      isMultipleTeams: Number.parseInt(target.numberOfTeams.value) > 1,
      isMultiDepartment,
      encouragementType: selectedEncouragementType.type as EncouragementType,
      trimester: selectedTrimester.type as Trimester,
      year: Number.parseInt(selectedYear.name),
      otherThematics: inputFields.otherThematics.value,
      requiredSkills: inputFields.requiredSkills.value,
      description: target.description.value,
      contextProblematic: target.contextProblematic.value,
      expectedResults: target.expectedResults.value,
      needsConstraints: target.needsConstraints.value,
      objectives: target.objectives.value,
      signatureImg: selectedFile[0].fileKey,
      thematics: Array.from(selectedThematics),
      promoterId: userData?.promoter.id,
      organizationId: selectedOrganization?.id,
      departments: [selectedDepartment.id, ...otherDepartments],
      mainDepartment: selectedDepartment.id,
      teachers,
      representatives,
      students,
      otherDepartments,
    };

    await createProject.mutateAsync(formData);

    if (createProject.isError) {
      setProjectCreationState(ProjectCreationState.ERROR);
    }
  };

  const value = {
    projectCreationState,
    handlePFEFormSubmit,
    uploadedFile,
    isFileLoading,
    selectFieldValidationErrors,
    teachers,
    setTeachers,
    representatives,
    setRepresentatives,
    students,
    setStudents,
    isMultiDepartment,
    setIsMultiDepartment,
    otherDepartments,
    setOtherDepartments,
    selectedEncouragementType,
    setSelectedEncouragementType,
    inputFields,
    setInputFields,
    selectedFile,
    setSelectedFile,
    selectedDepartment,
    setSelectedDepartment,
    yearOptions,
    selectedTrimester,
    setSelectedTrimester,
    selectedYear,
    setSelectedYear,
    selectedThematics,
    setSelectedThematics,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}

export { ProjectProvider, useProject };
