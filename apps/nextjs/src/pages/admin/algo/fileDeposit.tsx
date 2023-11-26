import React, { useCallback } from 'react';
import Head from "next/head";
import TopNav from "../../../components/TopNav";
import AdminView from "../../../components/RoleViews/AdminView";
import FileDrop from '../../../components/FileDrop';
import fs from 'fs';
import path from 'path';




const fileDeposit: React.FC = () => {
  const handleFileDrop = async (files: FileList) => {
      // Traitez les fichiers ici
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
          

          console.log("file", file)

          const formData = new FormData();
          formData.set('file', file);
          const res = await fetch("/api/admin/algo/fileDropHandler", {
            method: "POST",
            body: formData,
          });
          let rp = await res.json();
          console.log(rp);
        }
      }
    };

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
        <FileDrop onFileDrop={handleFileDrop}></FileDrop>
          
        </AdminView>
        
      </main>
    </>
  );
};

export default fileDeposit;
