import { PhoneIcon, PhoneXMarkIcon } from "@heroicons/react/24/solid";
import { departments } from "./ProjectCard";

export default function PersonDetails({
  name,
  email,
  role,
  phone,
  department,
}: {
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  department?: string | null;
}) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-base font-semibold leading-6 text-neutral-900">
            {name}
          </p>
          <p className="mt-1 truncate text-sm leading-5 text-neutral-500">
            {email}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-base leading-6 text-neutral-900">{role}</p>
        {phone ? (
          <div className="flex items-center gap-2">
            <PhoneIcon
              className="h-3 w-3 text-neutral-400"
              aria-hidden="true"
            />
            <p className="mt-1 text-sm leading-5 text-neutral-500">{phone}</p>
          </div>
        ) : (
          role !== "Étudiant" && (
            <div className="flex items-center gap-2">
              <PhoneXMarkIcon
                className="h-3 w-3 text-neutral-400"
                aria-hidden="true"
              />
              <p className="mt-1 text-sm leading-5 text-neutral-500">
                Téléphone non renseigné
              </p>
            </div>
          )
        )}
        {department && (
          <p className="mt-1 text-sm leading-5 text-neutral-500">
            {departments[department.toLocaleLowerCase()]}
          </p>
        )}
      </div>
    </li>
  );
}
