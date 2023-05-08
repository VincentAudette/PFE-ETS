import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";

const ProjectCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
}> = ({ post }) => {
  return (
    <button className="w-full rounded-lg border bg-white p-4 text-left shadow-sm transition-all hover:scale-[101%]">
      <h2 className="text-xl font-bold text-black">{post.title}</h2>
      <p className="text-base text-neutral-600">{post.content}</p>
    </button>
  );
};

export default ProjectCard;
