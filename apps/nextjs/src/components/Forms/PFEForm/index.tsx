import { useState } from "react";
import TableWithAddButton from "../../TableWithAddButton";
import SimpleInput from "../atoms/SimpleInput";
import SimpleSelect, { SelectOption } from "../atoms/SimpleSelect";
import CheckBoxInput from "../atoms/CheckBoxInput";
import SimpleTextArea from "../atoms/SimpleTextArea";
import UploadThingButton from "../atoms/UploadThingButton";
import Signature from "../../SVG/Signature";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { trpc } from "../../../utils/trpc";
import Image from "next/image";
import LoadingDots from "../../LoadingDots";
import { toast } from "react-toastify";
import {
  departement,
  descriptionDuProjet,
  representativePlaceholderObj,
  etudiantPlaceholderObj,
  teacherPlaceholderObj,
  trimesters,
  encouragementTypes,
  textAreaSections,
  checkBoxesAtEndOfForm,
  attestations,
  PFEFormElement,
  years,
  projObjectPresets,
  ProjObject,
  FieldKey,
} from "./helpers";
import { usePFEAuth } from "../../../context/PFEAuthContext";

export default function PFEForm() {
  // User data and selected organization
  const { userData, selectedOrganization } = usePFEAuth();

  // Project object containing all the fields for error handling
  const [projObject, setProjObject] = useState<ProjObject>(projObjectPresets);

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
    years()[0] as SelectOption,
  );

  // EncouragementType
  const [selectedEncouragementType, setSelectedEncouragementType] =
    useState<SelectOption>(encouragementTypes[0] as SelectOption);

  const [selectedDepartment, setSelectedDepartment] = useState<SelectOption>(
    departement[0] as SelectOption,
  );
  const [selectedFile, setSelectedFile] = useState<
    { fileUrl: string; fileKey: string }[] | undefined
  >(undefined);

  const [selectedThematics, setSelectedThematics] = useState<Set<number>>(
    new Set(),
  );

  const { data: uploadedFile, isLoading: isFileLoading } =
    trpc.file.byKey.useQuery(selectedFile?.[0]?.fileKey as string, {
      enabled: selectedFile != undefined && selectedFile[0] != undefined,
    });

  const { data: thematicsOfDepartment, isLoading: isThematicsLoading } =
    trpc.thematic.all.useQuery();
  const [isMultiDepartment, setIsMultiDepartment] = useState<boolean>(false);

  const createProject = trpc.project.create.useMutation({
    onSuccess: () => {
      toast.success("Projet créé avec succès");
    },
  });

  const handlePFEFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as PFEFormElement;

    let containsErrors = false;

    let projObjectCopy = { ...projObject };

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
            value: projObject[key].value,
            error: "Ce champ est obligatoire",
            label: projObject[key].label,
          },
        };
        containsErrors = true;
      }
    });

    if (containsErrors) {
      setProjObject(projObjectCopy);
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
      encouragementType: target["encouragementType[type]"].value,
      trimester: target["trimester[type]"].value,
      year: Number.parseInt(target["year[name]"].value),
      otherThematics: projObject.otherThematics.value,
      requiredSkills: projObject.requiredSkills.value,
      description: target.description.value,
      contextProblematic: target.contextProblematic.value,
      expectedResults: target.expectedResults.value,
      needsConstraints: target.needsConstraints.value,
      objectives: target.objectives.value,
      signatureImg: (uploadedFile as { key: string }).key,
      thematics: Array.from(selectedThematics),
      promoterId: userData?.promoter.id,
      organizationId: selectedOrganization?.id,
    };

    createProject.mutateAsync(formData);

    //clear the form
    setProjObject(projObjectPresets);
    setSelectedFile(undefined);
    setSelectedThematics(new Set());
    setSelectedDepartment(departement[0] as SelectOption);
    setSelectedTrimester(trimesters[0] as SelectOption);
    setSelectedYear(years()[0] as SelectOption);
    setSelectedEncouragementType(encouragementTypes[0] as SelectOption);
    setTeachers([]);
    setStudents([]);
    setRepresentatives([]);
    e.currentTarget.reset();
  };

  return (
    <div className="my-5 flex flex-col gap-12 px-4 py-3 text-base sm:px-6">
      <h1 className="text-center text-2xl font-bold">
        Formulaire de projet de fin d&apos;études
      </h1>
      <form className="flex flex-col gap-12" onSubmit={handlePFEFormSubmit}>
        <SimpleInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setProjObject({
              ...projObject,
              projectTitle: {
                ...projObject.projectTitle,
                value: e.target.value,
              },
            });
          }}
          value={projObject.projectTitle.value}
          validationError={projObject.projectTitle.error}
          type="text"
          name="projectTitle"
          id="projectTitle"
          label="Titre du projet (Le titre doit refléter qu’il s’agit d’un projet de conception d’un système, d’un composant, d’un procédé ou d’un processus.)"
          placeholder="Titre du projet"
        />

        <SimpleSelect
          name="departement"
          options={departement}
          selectedState={selectedDepartment}
          setSelectedState={setSelectedDepartment}
          label="Département de quel génie?"
        />

        <CheckBoxInput
          id="isMultiDepartment"
          name="isMultiDepartment"
          label="Est-ce que le projet est multi-département?"
          checked={isMultiDepartment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIsMultiDepartment(e.target.checked)
          }
        />

        {isMultiDepartment && (
          <div
            id="autres-departements"
            className="flex max-w-3xl flex-wrap gap-12"
          >
            {departement.map((dep) => {
              return (
                dep.type &&
                dep.name !== selectedDepartment.name && (
                  <CheckBoxInput
                    key={dep.id}
                    id={dep.id}
                    name={dep.name}
                    label={dep.name}
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
          />
          <SimpleSelect
            name="year"
            options={years()}
            label="Année"
            selectedState={selectedYear}
            setSelectedState={setSelectedYear}
          />
        </div>

        <SimpleSelect
          name="encouragementType"
          options={encouragementTypes}
          label="Que voulez-vous offrir comme encadrement?"
          selectedState={selectedEncouragementType}
          setSelectedState={setSelectedEncouragementType}
        />

        <div className="flex flex-col gap-[6.2rem] py-12">
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
            description="Avez-vous déjà sélectionné des étudiants pour votre projet? NOTE :  Les étudiants inscrits dans cette section ont été contactés et sont assurés de vouloir faire partie du projet. De ce fait, ils ne pourront choisir d’autres projets."
            buttonTitle="Nouvel étudiant"
            obj={{
              firstName: "Prénom",
              lastName: "Nom",
              email: "Courriel",
              departement: "Departement",
            }}
            placeholderObj={etudiantPlaceholderObj}
            objs={students}
            setObjs={setStudents}
          />

          <div className=" flex items-end gap-3">
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
              />
            </div>
            <div className="w-1/2">
              <SimpleInput
                type="number"
                name="numberOfTeams"
                label="Nombre d'équipes sur le projet"
                placeholder="Minimum 1 équipe"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="thematics"
            className=" mb-4 block text-sm font-medium text-gray-900"
          >
            Thématiques du projet{" "}
          </label>

          <section className="my-9">
            {isThematicsLoading ? (
              <LoadingDots />
            ) : (
              thematicsOfDepartment && (
                <div className="flex flex-wrap gap-2">
                  {thematicsOfDepartment.map((thematic) => {
                    const isThematicSelected = selectedThematics.has(
                      thematic.id,
                    );
                    return (
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
                          : "border bg-gray-100 text-gray-800 shadow-sm"
                      }
                      `}
                      >
                        {thematic.name}
                      </button>
                    );
                  })}
                </div>
              )
            )}
          </section>

          <SimpleTextArea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              e.preventDefault();
              setProjObject({
                ...projObject,
                otherThematics: {
                  ...projObject.otherThematics,
                  value: e.target.value,
                },
              });
            }}
            value={projObject.otherThematics.value}
            id="otherThematics"
            label="Autres thématiques"
            name="otherThematics"
            placeholder="Si votre projet contient d'autres thématiques, veuillez les indiquer ici."
            rows={2}
          />
        </div>

        <SimpleTextArea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            e.preventDefault();
            setProjObject({
              ...projObject,
              requiredSkills: {
                ...projObject.requiredSkills,
                value: e.target.value,
              },
            });
          }}
          value={projObject.requiredSkills.value}
          validationError={projObject.requiredSkills.error}
          id="requiredSkills"
          label="Expertises requises"
          name="requiredSkills"
          placeholder="Quelles sont les expertises requises pour le projet?"
          rows={4}
        />

        <div className="flex flex-col gap-3">
          <h2 className="mt-3 text-base font-bold">Description du projet</h2>

          <ul className="flex list-disc flex-col gap-2 text-sm text-gray-800">
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
                setProjObject({
                  ...projObject,
                  [textArea.name]: e.target.value,
                });
              }}
              value={projObject[textArea.name].value}
              validationError={projObject[textArea.name].error}
              id={textArea.name}
              {...textArea}
              key={textArea.name}
              rows={5}
            />
          );
        })}
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
                        <span className="text-sm text-gray-500">{note}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="border p-9">
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
                <ArrowPathIcon className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="h-22 flex w-64 items-center justify-center border">
                <Signature className="h-[4rem] w-32 text-gray-400" />
              </div>
            )}

            <UploadThingButton
              handleUploadComplete={(res) => {
                if (res !== undefined) {
                  setSelectedFile(res);
                }
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
  );
}
