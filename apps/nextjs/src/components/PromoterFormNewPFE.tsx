import { useState } from "react";
import SimpleInput from "./Forms/atoms/SimpleInput";
import SimpleSelect from "./Forms/atoms/SimpleSelect";
import CheckBoxInput from "./Forms/atoms/CheckBoxInput";

export default function PromoterFormNewPFE() {
  const [form, setForm] = useState({
    title: "",
    trimester: "",
    promoter: "",
    isPromoterEquipeEncadrement: false,
    isSpecificTeacherEncadrement: false,
    specificTeacherEncadrementHasBeenContacted: false,
    isSpecificStudents: false,
    numTeams: 0,
    studentsPerTeam: 0,
    themes: "",
    isProjectMultiDepartement: false,
    requiredExpertise: "",
    studentNames: "",
    multiDept: false,
    otherDepartments: "",
    description: "",
    additionalNotes: "",
    isContactTeamEncadrementSameAsPromoterContact: false,
  });

  const [students, setStudents] = useState([1]);

  const addStudent = () => {
    setStudents([...students, students.length + 1]);
  };

  const semesters = [
    {
      id: "0",
      name: "Hiver",
    },
    {
      id: "1",
      name: "Été",
    },
    {
      id: "2",
      name: "Automne",
    },
  ];

  const departments = [
    "Construction",
    "Log-TI",
    "Mécanique",
    "Production automatisée",
    "Opération et logistique",
  ];

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Submit your form
    console.log(form);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Projet de fin d'études</h1>
      <br />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <SimpleInput
          type="text"
          name="projectTitle"
          label="Titre du projet"
          placeholder="Titre du projet"
        />

        <hr className="my-4 h-px border-0 bg-gray-300"></hr>

        <SimpleSelect name={"semester"} options={semesters} label="Trimestre" />

        <hr className="my-4 h-px border-0 bg-gray-300"></hr>

        <SimpleInput
          type="text"
          name="promoterGroupName"
          label="Promoteur du projet"
          placeholder="ex: Departement de génie électrique"
        />

        <SimpleInput
          type="text"
          name="promoterContactName"
          label="Personne à contacter"
          placeholder="Nom du contact"
        />

        <div>
          <label
            htmlFor="promoterContactInfo"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Coordonées du contact
          </label>

          <textarea
            name="promoterContactInfo"
            id="promoterContactInfo"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Tel: 5141234567 email: test@etsmtl.ca "
          ></textarea>
        </div>

        <hr className="my-4 h-px border-0 bg-gray-300"></hr>

        <label
          htmlFor="promoterContactInfo"
          className="mb-2 block text-sm font-medium text-gray-900 "
        >
          Encadrement des étudiants
        </label>
        <CheckBoxInput
          id="isPromoteurEquipeEncadrement"
          name="isPromoteurEquipeEncadrement"
          label="Le promoteur ou son représentant désire t-il faire partie de l’équipe d’encadrement?"
          checked={form.isPromoterEquipeEncadrement}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, isPromoterEquipeEncadrement: e.target?.checked })
          }
        />

        {form.isPromoterEquipeEncadrement && (
          <div>
            <ul className="mb-6 w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 sm:flex">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center pl-3">
                  <input
                    id=""
                    type="radio"
                    value="onDemand"
                    name="list-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="horizontal-list-radio-license"
                    className="ml-2 w-full py-3 text-sm font-medium text-gray-900"
                  >
                    Sur demande
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                <div className="flex items-center pl-3">
                  <input
                    id="horizontal-list-radio-id"
                    type="radio"
                    value="weekly"
                    name="list-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 "
                  />
                  <label
                    htmlFor="horizontal-list-radio-id"
                    className="ml-2 w-full py-3 text-sm font-medium text-gray-900"
                  >
                    Sur une base hebdomadaire
                  </label>
                </div>
              </li>
            </ul>

            <CheckBoxInput
              id="isContactTeamEncadrementSameAsPromoterContact"
              name="isContactTeamEncadrementSameAsPromoterContact"
              label="Le contact du promoteur faisant partie de l'équipe d'encadrement est autre une personne que celle mentionnée ci-haut?"
              checked={form.isContactTeamEncadrementSameAsPromoterContact}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({
                  ...form,
                  isContactTeamEncadrementSameAsPromoterContact:
                    e.target?.checked,
                })
              }
            />
          </div>
        )}

        {form.isContactTeamEncadrementSameAsPromoterContact && (
          <div>
            <SimpleInput
              type="text"
              name="teamEnadrementContactName"
              label="Nom du contact"
              placeholder="Nom du contact"
            />
            <label
              htmlFor="teamEncadrementContactInfos"
              className="mb-2 mt-4 block text-sm font-medium text-gray-900"
            >
              Contact de l'autre personne
            </label>
            <textarea
              name="teamEncadrementContactInfos"
              id="teamEncadrementContactInfos"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 "
              placeholder="Eg: tel: 5142223333 courriel: email@courriel.com"
            ></textarea>
          </div>
        )}

        <CheckBoxInput
          id="isSpecificTeacherEncadrement"
          name="isSpecificTeacherEncadrement"
          label="Le promoteur désire que le projet soit encadré par un ou des professeurs en particulier."
          checked={form.isSpecificTeacherEncadrement}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({
              ...form,
              isSpecificTeacherEncadrement: e.target?.checked,
            })
          }
        />

        {form.isSpecificTeacherEncadrement && (
          <div className="space-y-4">
            <label
              htmlFor="specificTeacherEndadrementNames"
              className="mb-2 mt-4 block text-sm font-medium text-gray-900"
            >
              Noms du ou des professeurs
            </label>
            <textarea
              name="specificTeacherEndadrementNames"
              id="specificTeacherEndadrementNames"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 "
              placeholder="Ex: Alice, Bob"
            ></textarea>

            <CheckBoxInput
              id="specificTeacherEncadrementHasBeenContacted"
              name="specificTeacherEncadrementHasBeenContacted"
              label="Ce ou ces professeurs ont été contacté"
              checked={form.specificTeacherEncadrementHasBeenContacted}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({
                  ...form,
                  specificTeacherEncadrementHasBeenContacted: e.target?.checked,
                })
              }
            />
          </div>
        )}

        <hr className="my-4 h-px border-0 bg-gray-300"></hr>

        <div className="columns-2">
          <SimpleInput
            type="number"
            name="numberOfTeams"
            label="Nombre d'équipes sur le projet"
            placeholder="2"
          />

          <SimpleInput
            type="text"
            name="numberOfStudentsPerTeam"
            label="Nombre d'étudiants requis par équipe"
            placeholder="minimum 3 étudiants"
          />
        </div>

        <div>
          <label
            htmlFor="thematics"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Thématiques du projet
          </label>
          <textarea
            name="thematics"
            id="thematics"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Eg: Télécommunication, Informatique, Intelligence artificielle, énergie"
          ></textarea>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 ">
            Noms des éleves
          </label>

          <div className="flex">
            <div className="flex h-5 items-center">
              <input
                id="helper-radio"
                checked={!form.isSpecificStudents}
                onChange={(e) =>
                  setForm({
                    ...form,
                    isSpecificStudents: e.target.value === "true",
                  })
                }
                name="isSpecificStudents"
                aria-describedby="helper-radio-text"
                type="radio"
                value="false"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="ml-2 text-sm">
              <label
                htmlFor="helper-radio"
                className="font-medium text-gray-900"
              >
                Le promoteur n’a aucune préférence et n’a contacté aucun
                étudiant.
              </label>
              <p
                id="helper-radio-text"
                className="text-xs font-normal text-gray-500"
              >
                Pas besoin de spécifier le nom des étudiants dans ce cas
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="flex h-5 items-center">
              <input
                id="helper-radio"
                onChange={(e) =>
                  setForm({
                    ...form,
                    isSpecificStudents: e.target.value === "true",
                  })
                }
                checked={form.isSpecificStudents}
                name="isSpecificStudents"
                aria-describedby="helper-radio-text"
                type="radio"
                value="true"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="ml-2 text-sm">
              <label
                htmlFor="helper-radio"
                className="font-medium text-gray-900"
              >
                Le promoteur désire que le projet soit réalisé par un ou des
                étudiants en particulier.
              </label>
              <p
                id="helper-radio-text"
                className="text-xs font-normal text-gray-500"
              >
                Au besoin, la coordonnatrice de l’activité complètera l’équipe
                d’étudiants.
              </p>
            </div>
          </div>
        </div>
        {form.isSpecificStudents &&
          students.map((studentNumber) => (
            <div key={`student-${studentNumber}`}>
              <label className="text-sm font-medium text-gray-900">
                Étudiant {studentNumber}
              </label>

              <SimpleInput
                type="text"
                name={`specificStudentName${studentNumber}`}
                label={`Nom de l'étudiant ${studentNumber}`}
                placeholder="Alice"
              />
              <SimpleInput
                type="text"
                name={`specificStudentPermanentCode${studentNumber}`}
                label={
                  `Code permanent de l'étudiant ${studentNumber}` +
                  ` (facultatif)`
                }
                placeholder="KHAF12345"
              />
              <SimpleInput
                type="text"
                name={`specificStudentDepartement${studentNumber}`}
                label={`Departement de l'étudiant ${studentNumber}`}
                placeholder="LOG-TI"
              />
            </div>
          ))}

        {form.isSpecificStudents && (
          <button
            onClick={addStudent}
            className="rounded-lg bg-blue-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            Ajoutez un étudiant
          </button>
        )}

        <hr className="my-4 h-px border-0 bg-gray-300"></hr>

        <CheckBoxInput
          id="isProjectMultiDepartement"
          name="isProjectMultiDepartement"
          label="Le projet est en collaboration avec d'autres départements autres que celui de l'électrique"
          checked={form.isProjectMultiDepartement}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, isProjectMultiDepartement: e.target?.checked })
          }
        />

        {form.isProjectMultiDepartement && (
          <div>
            <label
              htmlFor="otherDepartments"
              className="mb-2 block text-sm font-medium text-gray-900 "
            >
              Sélectionnez le ou les autres départments
            </label>
            <ul className="w-48 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 ">
              {departments.map((department, index) => (
                <li
                  key={index}
                  className="w-full rounded-t-lg border-b border-gray-400"
                >
                  <div className="flex items-center pl-3">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      value={department}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-200 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="ml-2 w-full py-3 text-sm font-medium text-gray-900"
                    >
                      {department}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <hr className="my-4 h-px border-0 bg-gray-300"></hr>

        <div>
          <label
            htmlFor="projectDescription"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Description du projet
          </label>
          <textarea
            name="thematics"
            id="thematics"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Description du projet"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="extraNotes"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Notes aditionnelles
          </label>
          <textarea
            name="extraNotes"
            id="extraNotes"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Notes aditionnelles..."
          ></textarea>
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
