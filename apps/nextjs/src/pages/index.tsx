import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import TopNav from "../components/TopNav";
import SideBarLayout from "../components/SideBarLayout";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "@clerk/nextjs";
import WelcomeSection from "../components/WelcomeSection";
import FileUploadButton from "../components/FileUploadButton";

const Home: NextPage = () => {
  const postQuery = trpc.post.all.useQuery();
  const { isSignedIn, userId } = useAuth();

  //TODO: Get the user with clerk id

  return (
    <>
      <Head>
        <title>
          Projet de fin d&apos;études - École de Technologie Supérieur
        </title>
        <meta
          name="description"
          content="Application pour supporter les projets de fin d'études."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-neutral-50">
        <TopNav />
        <div className=" flex w-full max-w-5xl justify-between gap-10 px-4 py-10 sm:px-12 xl:max-w-[80rem] 2xl:max-w-[100rem]">
          {isSignedIn ? (
            <SideBarLayout>
              {postQuery.data ? (
                <div className="flex w-full flex-col gap-4">
                  {postQuery.data?.map((p: any) => {
                    return <ProjectCard key={p.id} post={p} />;
                  })}
                </div>
              ) : (
                <p>Loading..</p>
              )}
              <FileUploadButton />
            </SideBarLayout>
          ) : (
            <WelcomeSection />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
