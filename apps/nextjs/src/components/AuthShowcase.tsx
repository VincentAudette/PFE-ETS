import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import MinimalMenu from "./MinimalMenu";
import RoleBadge from "./RoleBadge";
import { Role } from "@acme/db";
import { usePFEAuth } from "../context/PFEAuthContext";

export default function AuthShowcase({ isSignedIn }: any) {
  const { authProfile, userData } = usePFEAuth();
  const activeRole = authProfile !== null ? authProfile : userData?.role;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn && (
        <>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              <RoleBadge role={activeRole as Role} darkMode={true} />
              {(activeRole === "DEVELOPER" || authProfile !== null) && (
                <MinimalMenu />
              )}
            </div>
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
