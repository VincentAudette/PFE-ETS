import Link from "next/link";

export default function AuthLayout({ children, titre }: any) {
  return (
    <main className="flex h-screen flex-col items-center bg-neutral-50 ">
      <div className="my-auto flex flex-col items-center justify-center gap-4">
        <Link
          href="/"
          className=" self-start rounded-md py-2 pl-3 pr-4 text-neutral-800 hover:bg-neutral-200 hover:text-black"
        >
          &larr; Retour
        </Link>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-[2rem]">
            {titre}
          </h1>
          {children}
        </div>
      </div>
    </main>
  );
}
