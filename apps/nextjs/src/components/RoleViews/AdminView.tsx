import { Post } from "@acme/db";
import ProjectCard from "../ProjectCard";
import SideBarLayout from "../SideBarLayout";
import { trpc } from "../../utils/trpc";

export default function AdminView() {
  const postQuery = trpc.post.all.useQuery();

  return (
    <SideBarLayout>
      {/* <FileUploadButton /> */}

      {postQuery.data ? (
        <div className="flex w-full flex-col gap-4">
          {postQuery.data?.map((p: Post) => {
            return <ProjectCard key={p.id} post={p} />;
          })}
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </SideBarLayout>
  );
}
