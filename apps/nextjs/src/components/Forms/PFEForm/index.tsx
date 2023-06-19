import TableWithAddButton from "../../TableWithAddButton";
import SimpleInput from "../atoms/SimpleInput";
import SimpleSelect from "../atoms/SimpleSelect";
import CheckBoxInput from "../atoms/CheckBoxInput";
import SimpleTextArea from "../atoms/SimpleTextArea";
import UploadThingButton from "../atoms/UploadThingButton";
import Signature from "../../SVG/Signature";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { trpc } from "../../../utils/trpc";
import Image from "next/image";
import LoadingDots from "../../LoadingDots";
import {
  department,
  descriptionDuProjet,
  representativePlaceholderObj,
  etudiantPlaceholderObj,
  teacherPlaceholderObj,
  trimesters,
  encouragementTypes,
  textAreaSections,
  checkBoxesAtEndOfForm,
  attestations,
} from "./helpers";
import {
  ProjectCreationState,
  useProject,
} from "../../../context/ProjectContext";
import LoadingPFE from "../../LoadingPFE";
import ProjectView from "../../ProjectView";
import { usePFEAuth } from "../../../context/PFEAuthContext";

export default function PFEForm() {
  const { data: allThematics, isLoading: isThematicsLoading } =
    trpc.thematic.all.useQuery();

  const {
    projectCreationState,
    handlePFEFormSubmit,
    selectedFile,
    setSelectedFile,
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
    selectedDepartment,
    setSelectedDepartment,
    yearOptions,
    selectedTrimester,
    setSelectedTrimester,
    selectedYear,
    setSelectedYear,
    selectedThematics,
    setSelectedThematics,
    projectId,
  } = useProject();

  const { userData, selectedOrganization } = usePFEAuth();

  // if (projectCreationState === ProjectCreationState.SUCCESS && projectId) {
  if (projectId) {
    return <ProjectView projectId={projectId} />;
  }

  return (
    <>
      {projectCreationState === ProjectCreationState.LOADING && <LoadingPFE />}
      <div className="my-5 mx-auto flex h-[300rem] max-w-5xl grow flex-col gap-12 px-4 py-3 text-base sm:px-6">
        <h1 className="sticky top-0 z-30 w-full border-b bg-white py-3 text-center text-xl font-bold">
          Formulaire de projet de fin d&apos;études par {userData?.firstName}{" "}
          {userData?.lastName} pour {selectedOrganization?.name}
        </h1>
        <form
          autoComplete="off"
          className="flex flex-col gap-12"
          onSubmit={handlePFEFormSubmit}
        >
          <h2 className=" text-base font-bold">
            1. Informations sur le projet
          </h2>
          <SimpleInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setInputFields({
                ...inputFields,
                projectTitle: {
                  ...inputFields.projectTitle,
                  value: e.target.value,
                },
              });
            }}
            value={inputFields.projectTitle.value}
            validationError={inputFields.projectTitle.error}
            type="text"
            autoComplete="off"
            name="projectTitle"
            id="projectTitle"
            label="Titre du projet (Le titre doit refléter qu’il s’agit d’un projet de conception d’un système, d’un composant, d’un procédé ou d’un processus.)"
            placeholder="Titre du projet"
          />

          <SimpleSelect
            name="department"
            options={department}
            selectedState={selectedDepartment}
            setSelectedState={setSelectedDepartment}
            label="Département de quel génie?"
            validationError={selectFieldValidationErrors.department}
          />

          <CheckBoxInput
            id="isMultiDepartment"
            name="isMultiDepartment"
            label="Est-ce que le projet est multi-département?"
            checked={isMultiDepartment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setIsMultiDepartment(e.target.checked);
              if (!e.target.checked) {
                setOtherDepartments([]);
              }
            }}
          />

          {isMultiDepartment && (
            <div
              id="autres-departements"
              className="flex max-w-3xl flex-wrap gap-12"
            >
              {department.map((dep) => {
                return (
                  dep.type &&
                  dep.name !== selectedDepartment.name && (
                    <CheckBoxInput
                      key={dep.id}
                      id={dep.id}
                      name={dep.name}
                      label={dep.name}
                      checked={otherDepartments.includes(dep.id)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) {
                          setOtherDepartments([...otherDepartments, dep.id]);
                        }
                        if (!e.target.checked) {
                          setOtherDepartments(
                            otherDepartments.filter(
                              (d: string) => d !== dep.id,
                            ),
                          );
                        }
                      }}
                    />
                  )
                );
              })}
            </div>
          )}

          <div className="flex gap-12">
            <SimpleSelect
              name="trimester"
              options={trimesters}
              label="Trimestre"
              selectedState={selectedTrimester}
              setSelectedState={setSelectedTrimester}
              validationError={selectFieldValidationErrors.trimester}
            />
            <SimpleSelect
              name="year"
              options={yearOptions}
              label="Année"
              selectedState={selectedYear}
              setSelectedState={setSelectedYear}
              validationError={selectFieldValidationErrors.year}
            />
          </div>

          <SimpleSelect
            name="encouragementType"
            options={encouragementTypes}
            label="Que voulez-vous offrir comme encadrement?"
            selectedState={selectedEncouragementType}
            setSelectedState={setSelectedEncouragementType}
            validationError={selectFieldValidationErrors.encouragementType}
          />

          <h2 className="pt-5 text-base font-bold">
            2. Participants au projet
          </h2>
          <div className="flex flex-col gap-[6.2rem]">
            <TableWithAddButton
              title="Représentants de l'entreprise"
              description="Est-ce que d'autres personnes de l'entreprise doivent être ajoutées au projet?"
              buttonTitle="Nouveau représentant"
              obj={{
                firstName: "Prénom",
                lastName: "Nom",
                phone: "Téléphone",
                email: "Courriel",
              }}
              placeholderObj={representativePlaceholderObj}
              objs={representatives}
              setObjs={setRepresentatives}
            />
            <hr />
            <TableWithAddButton
              title="Professeurs de l'École de technologie supérieure"
              description="Est-ce que vous avez déjà sélectionné un professeur pour votre projet?"
              buttonTitle="Nouveau professeur"
              obj={{
                firstName: "Prénom",
                lastName: "Nom",
                phone: "Téléphone",
                email: "Courriel",
              }}
              placeholderObj={teacherPlaceholderObj}
              objs={teachers}
              setObjs={setTeachers}
            />
            <hr />
            <TableWithAddButton
              title={`Étudiants préalablement sélectionnés (Maximum ${
                isMultiDepartment ? 8 : 5
              } étudiants)`}
              description="Avez-vous déjà sélectionné des étudiants pour votre projet? NOTE :  Les étudiants inscrits dans cette section ont été contactés et sont assurés de vouloir faire partie du projet. De ce fait, ils ne pourront choisir d’autres projets. Vous devez demander une autorisation au coordonnateur des PFE de votre département pour avoir une équipe de plus de 5 personnes."
              buttonTitle="Nouvel étudiant"
              obj={{
                firstName: "Prénom",
                lastName: "Nom",
                email: "Courriel",
                department: "Departement",
              }}
              placeholderObj={etudiantPlaceholderObj}
              objs={students}
              setObjs={setStudents}
              selectFields={["department"]}
              selectOptions={{ department }}
            />

            <div className=" flex items-center gap-3">
              <div className="w-1/2">
                <SimpleInput
                  type="number"
                  name="numberOfStudents"
                  label={`Nombre d'étudiants par équipe (minimum 3 et maximum ${
                    isMultiDepartment ? 8 : 5
                  })`}
                  placeholder={`Minimum 3 étudiants et maximum ${
                    isMultiDepartment ? 8 : 5
                  } étudiants`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setInputFields({
                      ...inputFields,
                      numberOfStudents: {
                        ...inputFields.numberOfStudents,
                        value: e.target.value,
                      },
                    });
                  }}
                  value={inputFields.numberOfStudents.value}
                  validationError={inputFields.numberOfStudents.error}
                />
              </div>
              <div className="w-1/2">
                <SimpleInput
                  type="number"
                  name="numberOfTeams"
                  label="Nombre d'équipes sur le projet"
                  placeholder="Minimum 1 équipe"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setInputFields({
                      ...inputFields,
                      numberOfTeams: {
                        ...inputFields.numberOfTeams,
                        value: e.target.value,
                      },
                    });
                  }}
                  value={inputFields.numberOfTeams.value}
                  validationError={inputFields.numberOfTeams.error}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-9 text-base font-bold">
              3. Thématiques et expertises
            </h2>
            <section className=" flex flex-col gap-9 lg:flex-row">
              <div className="lg:w-1/2">
                <label
                  htmlFor="thematics"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Sélectionner parmis la list de thématiques
                </label>
                {selectedDepartment.id === "0" ? (
                  <div className="py-3 text-sm text-neutral-500">
                    Vous devez choisir un département pour voir la liste de
                    thématiques
                  </div>
                ) : isThematicsLoading ? (
                  <LoadingDots />
                ) : (
                  allThematics && (
                    <div className="flex flex-wrap gap-2">
                      {allThematics.map((thematic) => {
                        const isThematicSelected = selectedThematics.has(
                          thematic.id,
                        );
                        return (
                          (selectedDepartment.id === thematic.departmentId ||
                            otherDepartments.includes(
                              thematic.departmentId,
                            )) && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                const thematicSet = new Set(selectedThematics);
                                if (isThematicSelected) {
                                  thematicSet.delete(thematic.id);
                                } else {
                                  thematicSet.add(thematic.id);
                                }
                                setSelectedThematics(thematicSet);
                              }}
                              key={thematic.id}
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${
                        isThematicSelected
                          ? "border border-blue-500 bg-blue-600 text-white "
                          : "border bg-neutral-100 text-neutral-800 shadow-sm"
                      }
                      `}
                            >
                              {thematic.name}
                            </button>
                          )
                        );
                      })}
                    </div>
                  )
                )}
              </div>
              <div className="lg:w-1/2">
                <SimpleTextArea
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    e.preventDefault();
                    setInputFields({
                      ...inputFields,
                      otherThematics: {
                        ...inputFields.otherThematics,
                        value: e.target.value,
                      },
                    });
                  }}
                  value={inputFields.otherThematics.value}
                  id="otherThematics"
                  label="Autres thématiques"
                  name="otherThematics"
                  placeholder="Si votre projet contient d'autres thématiques, veuillez les indiquer ici."
                  rows={4}
                />
              </div>
            </section>
          </div>

          <SimpleTextArea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              e.preventDefault();
              setInputFields({
                ...inputFields,
                requiredSkills: {
                  ...inputFields.requiredSkills,
                  value: e.target.value,
                },
              });
            }}
            value={inputFields.requiredSkills.value}
            validationError={inputFields.requiredSkills.error}
            id="requiredSkills"
            label="Expertises requises"
            name="requiredSkills"
            placeholder="Quelles sont les expertises requises pour le projet?"
            rows={4}
          />

          <div className="flex flex-col gap-3">
            <h2 className="mt-3 text-base font-bold">
              4. Description du projet
            </h2>

            <ul className="flex list-inside list-disc flex-col gap-2 text-sm text-neutral-800">
              {descriptionDuProjet.map((listItem) => (
                <li key={listItem.substring(0, 10)}>{listItem}</li>
              ))}
            </ul>
          </div>

          {textAreaSections.map((textArea) => {
            return (
              <SimpleTextArea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  e.preventDefault();
                  setInputFields({
                    ...inputFields,
                    [textArea.name]: {
                      ...inputFields[textArea.name],
                      value: e.target.value,
                    },
                  });
                }}
                value={inputFields[textArea.name].value}
                validationError={inputFields[textArea.name].error}
                id={textArea.name}
                {...textArea}
                key={textArea.name}
                rows={5}
              />
            );
          })}

          <h2 className="mt-3 text-base font-bold">
            5. Consentements et conformités
          </h2>
          <div className="flex flex-col gap-8">
            {checkBoxesAtEndOfForm.map(({ id, name, notes }) => (
              <div key={id} className="group relative">
                <div className="items-center gap-2">
                  <CheckBoxInput id={id} name={name} label={name} />
                  {notes &&
                    notes.map((note) => {
                      return (
                        <div
                          key={note.substring(0, 10)}
                          className="mt-3 flex flex-col gap-2 px-7"
                        >
                          <span className="text-sm text-neutral-600">
                            {note}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md border p-9 shadow-sm">
            <h2 className="my-3 text-base font-bold">Attestation</h2>
            <div className="flex flex-col gap-4">
              {attestations.map((attestation) => (
                <blockquote
                  key={attestation.substring(0, 10)}
                  className="text-sm"
                >
                  {attestation}
                </blockquote>
              ))}
            </div>

            <div className="flex py-5">
              {selectedFile && selectedFile[0]?.fileUrl ? (
                <div className="h-22 flex w-64 items-center justify-center border">
                  <Image
                    src={selectedFile[0].fileUrl}
                    alt="signuature"
                    className="h-auto w-full"
                    width={128}
                    height={64}
                  />
                </div>
              ) : selectedFile != undefined && isFileLoading ? (
                <div className="h-22 flex w-64 items-center justify-center border">
                  <ArrowPathIcon className="h-8 w-8 animate-spin text-neutral-400" />
                </div>
              ) : (
                <div className="h-22 flex w-64 items-center justify-center border">
                  <Signature className="h-[4rem] w-32 text-neutral-400" />
                </div>
              )}

              <UploadThingButton
                handleUploadComplete={(res) => {
                  setSelectedFile(res);
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mr-2 mb-2 rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Créer le projet
          </button>
        </form>
      </div>
    </>
  );
}
