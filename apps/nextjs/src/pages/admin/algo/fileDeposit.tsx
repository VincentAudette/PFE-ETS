import React, { useCallback } from 'react';
import Head from "next/head";
import TopNav from "../../../components/TopNav";
import AdminView from "../../../components/RoleViews/AdminView";




const fileDeposit: React.FC = () => {
  const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    // Traitez les fichiers ici (par exemple, lisez-les en utilisant FileReader)

    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log('Nom du fichier:', file?.name);
      console.log('Type du fichier:', file?.type);

      // Exemple de lecture d'un fichier avec FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        console.log('Contenu du fichier:', content);
      };
      if(file){
        reader.readAsText(file); // Utilisez readAsBinaryString pour les fichiers binaires comme Excel
      }
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <>
      <Head>
        <title>
          Nouveau PFE - Projet de fin d&apos;études - École de Technologie
          Supérieur
        </title>
        <meta
          name="description"
          content="Application pour supporter les projets de fin d'études."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopNav
          pages={[
            {
              name: "Algo",
              href: "/admin/algo/fileDeposit",
              current: true,
            },
          ]}
        />
        <AdminView>
        <div
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
      style={{
        width: '300px',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px dashed #3498db',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: '#ecf0f1',
        margin: '20px auto',
      }}
    >
      <p style={{ textAlign: 'center', color: '#3498db' }}>
        Glissez et déposez un fichier Excel ou CSV ici
      </p>
    </div>
          
        </AdminView>
        
      </main>
    </>
  );
};

export default fileDeposit;
