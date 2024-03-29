import { HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Breadcrumb({
  pages,
}: {
  pages?: { name: string; href: string; current: boolean }[] | undefined;
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex space-x-4 rounded-md bg-white px-6 shadow"
      >
        <li className="flex">
          <div className="flex items-center">
            <Link href="/" className="text-neutral-400 hover:text-neutral-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Accueil</span>
            </Link>
          </div>
        </li>
        {pages?.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-neutral-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-neutral-500 hover:text-neutral-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
