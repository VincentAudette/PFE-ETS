import React, { useState } from 'react';
import Head from "next/head";
import TopNav from "../../../components/TopNav";
import AdminView from "../../../components/RoleViews/AdminView";
import FileDrop from '../../../components/FileDrop';
import LoadingPFE from "../../../components/LoadingPFE";
import PfeTeamView from '../../../components/PfeTeamView';
import { json } from 'stream/consumers';

const fileDeposit: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [data, setData] = useState(null);




  const handleFileDrop = async (files: FileList) => {
      // Traitez les fichiers ici
      setLoading(true);
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
          try{
          const formData = new FormData();
          formData.set('file', file);
          const res = await fetch("/api/admin/algo/fileDropHandler", {
            method: "POST",
            body: formData,
          });

          if(res.ok){
             let rp = await res.json();
             setData(rp);
            setDataReady(true);
            console.log(rp.equipe);
          }}catch(error){
            console.log(error);
          }finally{
            setLoading(false);
          }
          
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
        {loading && <LoadingPFE></LoadingPFE>}
        {dataReady && <PfeTeamView equipe ={data}></PfeTeamView>}
          
        </AdminView>
        
      </main>
    </>
  );
};

export default fileDeposit;
