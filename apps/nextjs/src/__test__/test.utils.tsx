import { render } from "@testing-library/react";
import React from "react";
import { PFEAuthContext, PFEAuthContextType } from "../context/PFEAuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRouter } from "@acme/api";
import {
  EncouragementType,
  FileType,
  ProjectStatus,
  Role,
  Trimester,
} from "@acme/db";
import { inferProcedureOutput } from "@trpc/server";
import { RadioCardsWithImageOption } from "../components/Forms/atoms/RadioCardsWithImage";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { ProjectProvider } from "../context/ProjectContext";

const mockUserData = {
  id: "1",
  email: "mock-email@domain.com",
  firstName: "John",
  lastName: "Doe",
  clerkId: "clerkId-1",
  phone: "1234567890",
  role: Role.STUDENT, // or whatever role you want to set
  promoter: {
    id: 1,
    userId: "3",
    hasBeenNotified: false,
    organizations: [
      {
        promoterId: 1,
        organizationId: 1,
        organization: {
          id: 1,
          name: "Acme Corp",
          description: "An organization",
          isETS: true,
          projects: [],
          logo: null,
          promoters: [],
        },
      },
    ],
    projects: [
      {
        id: "project-1",
        pfeId: "pfe-1",
        title: "Mock Project Title",
        trimester: Trimester.AUTOMNE, // update with your value
        year: 2023,
        promoterId: 1,
        organizationId: 1,
        organization: {
          id: 1,
          name: "Mock Organization",
          description: "This is a mock organization",
          isETS: false,
          projects: [],
          logo: {
            key: "testKey",
            name: "testName",
            type: FileType.PDF,
            url: "testUrl",
            uploadedAt: new Date(),
            organizationId: 1,
            projectId: "testProjectId",
          },
          promoters: [],
        },
        encouragementType: EncouragementType.NO_ENCOURAGEMENT, // update with your value
        numberOfTeamsRequested: 1,
        numberOfStudents: 2,
        isMultiDepartment: false,
        acceptsConfidentiality: true,
        authorizesCloudComputing: true,
        authorizesCloudOutsideQuebec: true,
        mustRespectRegulations: true,
        submissionDate: new Date(),
        description: "Mock project description",
        requiredSkills: "Mock required skills",
        contextProblematic: "Mock context problematic",
        expectedResults: "Mock expected results",
        needsConstraints: "Mock needs constraints",
        objectives: "Mock objectives",
        files: [],
        isMultipleTeams: false,
        numberOfTeams: 1,
        numberOfIterations: 0,
        isSelectedDuringSemester: false,
        isAssignedToTeacher: false,
        otherThematics: "Mock thematics",
        mainDepartmentId: "dept-1",
        departments: [],
        firstChoices: [],
        secondChoices: [],
        thirdChoices: [],
        fourthChoices: [],
        thematics: [],
        representatives: [],
        teachers: [],
        states: [
          {
            id: 1,
            projectId: "project-1",
            state: ProjectStatus.ACCEPTED,
            timestamp: new Date(),
          },
        ],
      },
    ],
  },
};

const mockOrganization: inferProcedureOutput<
  AppRouter["organization"]["getByIds"]
>[number] = {
  id: 1,
  name: "Mock Organization",
  description: "This is a mock organization",
  isETS: false,
  logo: {
    key: "mock_key",
    name: "mock_img",
    type: "IMAGE",
    url: "some_url",
    uploadedAt: new Date(),
    organizationId: 1,
    projectId: null,
  },
};

const mockRegistrationUserData = {
  firstName: "Mock",
  lastName: "User",
  email: "mock-user@domain.com",
  department: "Mock Department",
  codePermanent: "MOCK123",
  phone: "1234567890",
};

const mockRadioCardsWithImageOption: RadioCardsWithImageOption = {
  id: 1,
  title: "Mock Title",
  description: "This is a mock description",
  src: "mock-src",
};

const mockValues: PFEAuthContextType = {
  authProfile: Role.STUDENT, // or another mock Role
  setAuthProfile: jest.fn(),
  userData: mockUserData,
  setUserData: jest.fn(),
  selectedOrganization: mockOrganization,
  setSelectedOrganization: jest.fn(),
  preSubmitOrganization: {
    ...mockOrganization,
    logo: {
      key: "testKey",
      name: "testName",
      type: FileType.PDF,
      url: "testUrl",
      uploadedAt: new Date(),
      organizationId: 1,
      projectId: "testProjectId",
    },
  },
  setPreSubmitOrganization: jest.fn(),
  registrationUserData: mockRegistrationUserData,
  setRegistrationUserData: jest.fn(),
  currentStep: 1,
  setCurrentStep: jest.fn(),
  typeOfProfile: "PROMOTER", // or "STUDENT", "PROMOTER_ETS"
  setTypeOfProfile: jest.fn(),
  handleOnChangePhoneNumber: jest.fn(),
  selectedPromoterEtsOption: mockRadioCardsWithImageOption,
  setSelectedPromoterEtsOption: jest.fn(),
};

type PFEAuthProviderProps = {
  children: React.ReactNode;
  value?: PFEAuthContextType;
};

function PFEAuthProvider({ children, value }: PFEAuthProviderProps) {
  return (
    <PFEAuthContext.Provider value={mockValues}>
      {children}
    </PFEAuthContext.Provider>
  );
}

import { trpc } from "../utils/trpc";
import { AppType } from "next/app";
import { ToastContainer } from "react-toastify";

const MockApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  // You can modify this to match your mock setup
  return (
    <ClerkProvider localization={frFR} {...pageProps}>
      <ToastContainer />
      <PFEAuthProvider>
        <ProjectProvider>
          <div className="">
            <Component {...pageProps} />
          </div>
        </ProjectProvider>
      </PFEAuthProvider>
    </ClerkProvider>
  );
};

export const MockWrappedApp = trpc.withTRPC(MockApp);

// Then in your test file
const customRender = (ui: React.ReactElement, options = {}) => {
  const mockQueryClient = new QueryClient();
  return render(
    <QueryClientProvider client={mockQueryClient}>
      <MockWrappedApp Component={() => ui} pageProps={{}} />
    </QueryClientProvider>,
    options,
  );
};

export * from "@testing-library/react";

// override the built-in render with our own
export { customRender as render };
