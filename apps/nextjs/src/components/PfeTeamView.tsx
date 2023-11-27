

export default function PfeTeamView(data:any) {

    console.log(data.equipe.reponseFormatee);
    if (!data || !data.equipe.reponseFormatee) {
        // Handle the case where data or data.reponseFormatee is undefined or null
        return <p>Data is missing or invalid.</p>;
      }
    
      return (
        <div>
          <h2>Equipe Information</h2>
          <p>Total Students: {data.equipe.reponseFormatee.totalEtudiants || 'N/A'}</p>
          <p>Global Satisfaction: {data.equipe.reponseFormatee.satisfactionGlobale || 'N/A'}</p>
    
          <h2>Projects</h2>
          {data.equipe.reponseFormatee.projets.map((projet:any, index:any) => (
            <div key={index}>
              <h3><strong>{projet.projet}</strong></h3>
              <p>Satisfaction: {projet.satisfaction || 'N/A'}</p>
    
              <h4>Students</h4>
              <ul>
                {projet.etudiants.map((etudiant:any, etudiantIndex:any) => (
                  <li key={etudiantIndex}>
                    {etudiant.courriel} - Satisfaction: {etudiant.satisfaction || 'N/A'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    
}