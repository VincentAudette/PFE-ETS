import { useRouter } from "next/router";
import FileUploadButton from "../../components/FileUploadButton";
import { trpc } from "../../utils/trpc";

export default function ProjectPage() {
  const { query } = useRouter();

  const postQuery = trpc.post.byId.useQuery(query.id as string);

  return (
    <>
      <h1>Project Page</h1>
      <FileUploadButton />
    </>
  );
}
