import { toast } from "react-toastify";
import { trpc } from "../utils/trpc";
import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { PFEStateFormElement } from "../components/Forms/PFEForm/helpers";
import { SelectOption } from "../components/Forms/atoms/SimpleSelect";
import { useRouter } from "next/router";

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
}

const ProjectStateContext = React.createContext<
  ProjectStateContext | undefined
>(undefined);

function ProjectStateProvider({ children }: { children: React.ReactNode }) {
  const [formEvent, setFormEvent] =
    useState<React.FormEvent<HTMLFormElement> | null>(null);

  const [selectedState, setSelectedState] = useState<SelectOption>(
    {} as SelectOption,
  );

  const [projectCreationState, setProjectCreationState] =
    useState<ProjectCreationState>(ProjectCreationState.IDLE);

  const router = useRouter();

  let projectId = "";

  const createProjectSate = trpc.projectState.create.useMutation({
    onSuccess: (data) => {
      toast.success("État mis à jour");
      router.push(`/admin/project/list?focus=${projectId}`);
      // document.location.href = "/admin/project/list";
    },
  });

  const handlePPEStateFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setProjectCreationState(ProjectCreationState.LOADING);
    setFormEvent(e);
    const target = e.target as PFEStateFormElement;
    projectId = target["projectId"].value as string;

    const formData = {
      state: target["state[id]"].value,
      projectId: projectId,
      timestamp: new Date(),
    };

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
  };
  return (
    <ProjectStateContext.Provider value={value}>
      {children}
    </ProjectStateContext.Provider>
  );
}

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
