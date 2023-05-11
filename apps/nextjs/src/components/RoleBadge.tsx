import { Role } from "@acme/db";

export default function RoleBadge({
  role,
  darkMode = false,
}: {
  role: Role;
  darkMode?: boolean;
}) {
  let color = darkMode
    ? "bg-blue-400/10 text-blue-400 ring-blue-400/20"
    : "bg-blue-50 text-blue-700 ring-blue-700/10";

  let roleDisplayName = "Développeur";

  if (role === "ADMIN") {
    color = darkMode
      ? "bg-indigo-400/10 text-indigo-400 ring-indigo-400/20"
      : "bg-indigo-50 text-indigo-700 ring-indigo-700/10";
    roleDisplayName = "Administrateur";
  } else if (role === "PROMOTER") {
    color = darkMode
      ? "bg-purple-400/10 text-purple-400 ring-purple-400/20"
      : "bg-gradient-to-tr from-pink-50 to-purple-50 text-purple-700 ring-purple-700/10";
    roleDisplayName = "Promoteur";
  } else if (role === "STUDENT") {
    color = darkMode
      ? "bg-emerald-400/10 text-emerald-400 ring-emerald/20"
      : "bg-gradient-to-tr from-blue-50 to-emerald-50 text-emerald-700 ring-emerald-700/10";
    roleDisplayName = "Étudiant";
  }

  return (
    <span
      className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium ring-1 ring-inset ${color}`}
    >
      {roleDisplayName}
    </span>
  );
}
