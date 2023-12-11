

export default function PfeTeamView(data:any) {

    console.log(data.equipe.reponseFormatee);
    if (!data || !data.equipe.reponseFormatee) {
        // Handle the case where data or data.reponseFormatee is undefined or null
        return <p>Data is missing or invalid.</p>;
      }
    
      return (
        <div className="table w-full border-collapse border border-gray-800">
  <div className="table-header-group bg-gray-200">
    <h2 className="font-bold p-4">Equipe Information</h2>
  </div>
  <div className="table-row-group">
    <div className="table-row border-b border-gray-700">
      <div className="table-cell p-4">Total Students</div>
      <div className="table-cell p-4">{data.equipe.reponseFormatee.totalEtudiants || 'N/A'}</div>
    </div>
    <div className="table-row border-b border-gray-700">
      <div className="table-cell p-4">Global Satisfaction</div>
      <div className="table-cell p-4">{data.equipe.reponseFormatee.satisfactionGlobale || 'N/A'}</div>
    </div>
  </div>

  <div className="table-header-group bg-gray-200">
    <h2 className="font-bold p-4">Projects</h2>
  </div>
  <div className="table-row-group">
    {data.equipe.reponseFormatee.projets.map((projet: any, index: any) => (
      <div key={index} className="table-row border-b border-gray-700">
        <div className="table-cell p-4">
          <h3 className="font-bold">{projet.projet}</h3>
        </div>
        <div className="table-cell p-4">Satisfaction: {projet.satisfaction || 'N/A'}</div>

        <div className="table-cell p-4">
          <h4 className="font-bold">Students</h4>
          <ul>
            {projet.etudiants.map((etudiant: any, etudiantIndex: any) => (
              <li key={etudiantIndex} className="p-2">
                {etudiant.courriel} - Satisfaction: {etudiant.satisfaction || 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
</div>


      );
    
}