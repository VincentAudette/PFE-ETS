import { UserButton, useAuth } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import MinimalMenu from "./MinimalMenu";

export default function AuthShowcase() {
  const { isSignedIn } = useAuth();
  const { data: role } = trpc.auth.getRole.useQuery(undefined, {
    enabled: !!isSignedIn,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn && (
        <>
          <div className="flex items-center justify-center gap-3">
            {role === "DEVELOPER" ? (
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
                  {role}
                </span>
                <MinimalMenu />
              </div>
            ) : (
              <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
                {role}
              </span>
            )}
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "3rem",
                    height: "3rem",
                  },
                },
              }}
            />
          </div>
        </>
      )}
      {!isSignedIn && (
        <div className="flex gap-2">
          <Link href="/sign-in">
            <button
              type="button"
              className="rounded-md  px-3 py-2 text-sm font-semibold text-neutral-200 hover:text-white hover:underline"
            >
              Se connecter
            </button>
          </Link>
          <Link href="/sign-up">
            <button
              type="button"
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50"
            >
              Créer un compte
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
