import { useState } from 'react';
import InputWithIcon from "./Forms/atoms/InputWithIcon";
import SimpleSelect from "./Forms/atoms/SimpleSelect";

export default function PromoterFormNewPFE() {
  const [form, setForm] = useState({
    title: '',
    trimester: '',
    promoter: '',
    mentoring: false,
    numTeams: 0,
    studentsPerTeam: 0,
    themes: '',
    requiredExpertise: '',
    studentNames: '',
    multiDept: false,
    otherDepartments: '',
    description: '',
    additionalNotes: '',
  });

  
const semesters = [
  {
    id: "0",
    name: "Automne",
  },
  {
    id: "1",
    name: "Hiver",
  },
  {
    id: "2",
    name: "Ete",
  }
];

  // const handleChange = (event) => {
  //   setForm({
  //     ...form,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Submit your form
    console.log(form);
  };

  return (
    <div>
    <h1 className="text-2xl font-bold text-center">Création d'un nouveau PFE</h1>
    <br/>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

      <InputWithIcon
          type="text"
          name="projectTitle"
          label="Titre du projet"
          placeholder="Projet de fin d'etude"
        />

      <SimpleSelect
        name={"semester"}
        options={semesters}
        label="Trimestre"
      />

      <InputWithIcon
          type="text"
          name="promoterGroupName"
          label="Groupe promoteur du projet"
          placeholder="ex: Dep des sciences, Hydro-Quebec"
        />

      <InputWithIcon
          type="text"
          name="promoterContact"
          label="Nom du contact chez le promoteur"
          placeholder="Nom du contact"
        />
        
        <div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Coordonées du contact</label>
          <textarea name="message" id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 " 
          placeholder="Numero de tel: 5141234567 email: khady@ets.ca">
          </textarea>
        </div>


      <label>
        PROMOTEUR ou son représentant désire faire partie de l’équipe d’encadrement?
        <input
          type="checkbox"
          name="mentoring"
          onChange={(e) => setForm({ ...form, mentoring: e.target.checked })}
          checked={form.mentoring}
        />
      </label>

      <label>
        NOMBRE D’ÉQUIPES:
        <input name="numTeams" type="number"  value={form.numTeams} />
      </label>

      <label>
        Nombre d’étudiants requis par équipe:
        <input name="studentsPerTeam" type="number"  value={form.studentsPerTeam} />
      </label>

      <label>
        Thématiques:
        <input name="themes"  value={form.themes} />
      </label>

      <label>
        Expertises requises:
        <input name="requiredExpertise"  value={form.requiredExpertise} />
      </label>

      <label>
        NOM des étudiants:
        <input name="studentNames"  value={form.studentNames} />
      </label>

      <label>
        PROJET MULTIDÉPARTEMENTS:
        <input
          type="checkbox"
          name="multiDept"
          onChange={(e) => setForm({ ...form, multiDept: e.target.checked })}
          checked={form.multiDept}
        />
      </label>

      <label>
        Départements impliqués (autre que ÉLÉ):
        <input name="otherDepartments"  value={form.otherDepartments} />
      </label>

      <label>
        DESCRIPTION du projet:
        <textarea name="description"  value={form.description} />
      </label>

      <label>
        Notes supplémentaires:
        <textarea name="additionalNotes"  value={form.additionalNotes} />
      </label>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
}