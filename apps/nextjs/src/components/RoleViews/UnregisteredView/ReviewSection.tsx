import RoleBadge from "../../RoleBadge";
import Image from "next/image";
import Button from "../../Forms/atoms/button";
import { usePFEAuth } from "../../../context/PFEAuthContext";
import {
  createPromoter,
  createStudent,
} from "../../../utils/registration-helpers";
import { useAuth } from "@clerk/nextjs";
import { trpc } from "../../../utils/trpc";
import { toast } from "react-toastify";
import H2TopHeaderWithBottomLine from "../../Forms/atoms/H2TopHeaderWithBottomLine";
import { useRouter } from "next/router";

export default function ReviewSection() {
  const { userId: clerkId } = useAuth();
  const {
    selectedPromoterEtsOption,
    typeOfProfile,
    selectedOrganization,
    registrationUserData,
  } = usePFEAuth();

  const router = useRouter();
  const updateToPromoterWithOrg =
    trpc.user.updateToPromoterWithOrganisation.useMutation();
  const createOrUpdateStudent = trpc.student.createOrUpdate.useMutation();

  const handleCreation = async () => {
    if (!clerkId) return;
    switch (typeOfProfile) {
      case "PROMOTER":
        try {
          await createPromoter(
            clerkId,
            {
              firstName: registrationUserData?.firstName as string,
              lastName: registrationUserData?.lastName as string,
              email: registrationUserData?.email as string,
              phone: registrationUserData?.phone as string,
            },
            updateToPromoterWithOrg,
            "PROMOTER",
            selectedOrganization,
          );
        } catch (e: any) {
          toast.error(e.message);
        }
        break;
      case "PROMOTER_ETS":
        if (selectedPromoterEtsOption === null) {
          toast.error("Veuillez un option d'association avec l'ÉTS.");
          return;
        }
        try {
          await createPromoter(
            clerkId,
            {
              firstName: registrationUserData?.firstName as string,
              lastName: registrationUserData?.lastName as string,
              email: registrationUserData?.email as string,
              phone: registrationUserData?.phone as string,
            },
            updateToPromoterWithOrg,
            "PROMOTER_ETS",
            {
              id: selectedPromoterEtsOption?.id, //FIXME: change the id for the org to the correct one
              name: selectedPromoterEtsOption?.title as string,
            },
          );
        } catch (e: any) {
          toast.error(e.message);
        }
        break;
      case "STUDENT":
        try {
          const userCreationRes = await createStudent(
            clerkId,
            {
              firstName: registrationUserData?.firstName as string,
              lastName: registrationUserData?.lastName as string,
              email: registrationUserData?.email as string,
            },
            createOrUpdateStudent,
            "ele",
          );
          if (userCreationRes.success) {
            toast.success(userCreationRes.message);
            router.push("/student");
          }
        } catch (e: any) {
          toast.error(e.message);
        }
        break;
      default:
        console.log("typeOfProfile is not defined.", typeOfProfile);

        toast.error("Le profil n'est pas spécifié, retourner à l'étape 1.");
        break;
    }
  };

  return (
    <div className="rounded-md bg-gray-100 p-5 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Revue</h2>
      <p className="mb-6 text-gray-600">
        Veuillez vérifier les informations suivantes avant de continuer.
      </p>
      <div className="rounded-md border border-gray-200 bg-white p-4">
        <H2TopHeaderWithBottomLine>Type de compte</H2TopHeaderWithBottomLine>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          <div>Profile:</div>
          <div className="font-medium">
            {typeOfProfile === "PROMOTER" && <RoleBadge role="PROMOTER" />}
            {typeOfProfile === "STUDENT" && <RoleBadge role="STUDENT" />}
            {typeOfProfile === "PROMOTER_ETS" && <RoleBadge role="PROMOTER" />}
          </div>
          {typeOfProfile === "PROMOTER_ETS" && (
            <>
              <div>Affiliation:</div>
              <div className="font-medium">Avec ÉTS (Interne)</div>
            </>
          )}
          {typeOfProfile === "PROMOTER" && (
            <>
              <div>Affiliation:</div>
              <div className="font-medium">Entreprise externe</div>
            </>
          )}
        </div>
      </div>
      <div className="my-4" />
      <div className="rounded-md border border-gray-200 bg-white p-4">
        <H2TopHeaderWithBottomLine>
          Informations personnelles
        </H2TopHeaderWithBottomLine>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          <div>Prénom:</div>
          <div className="font-medium">{registrationUserData?.firstName}</div>
          <div>Nom:</div>
          <div className="font-medium">{registrationUserData?.lastName}</div>
          <div>Courriel:</div>
          <div className="font-medium">{registrationUserData?.email}</div>
          {(typeOfProfile === "PROMOTER" ||
            typeOfProfile === "PROMOTER_ETS") && (
            <>
              <div>Téléphone:</div>
              <div className="font-medium">
                {registrationUserData?.phone || "Non fournis"}
              </div>
            </>
          )}
          {typeOfProfile === "STUDENT" && (
            <>
              <div>Code permanent:</div>
              <div className="font-medium">
                {registrationUserData?.codePermanent}
              </div>
              <div>Departement:</div>
              <div className="font-medium">
                {registrationUserData?.department}
              </div>
            </>
          )}
        </div>

        {typeOfProfile === "PROMOTER" &&
          selectedOrganization &&
          !selectedOrganization.name.includes("Selectionner") && (
            <div className="mt-5">
              <H2TopHeaderWithBottomLine>
                Organisation
              </H2TopHeaderWithBottomLine>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                <div>Nom:</div>
                <div className="font-medium">{selectedOrganization.name}</div>
                <div>Logo:</div>
                <div>
                  <Image
                    className="rounded-md border shadow-sm"
                    alt={`${selectedOrganization.name} logo`}
                    src={selectedOrganization.logo?.url || ""}
                    width={96}
                    height={96}
                  />
                </div>
                <div>Description:</div>
                <div className="font-medium">
                  {selectedOrganization.description}
                </div>
              </div>
            </div>
          )}

        {typeOfProfile === "PROMOTER_ETS" &&
          selectedPromoterEtsOption !== null && (
            <div className="mt-5">
              <H2TopHeaderWithBottomLine>
                Organisation
              </H2TopHeaderWithBottomLine>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                <div>Nom:</div>
                <div className="font-medium">
                  {selectedPromoterEtsOption.title}
                </div>
                <div>Logo:</div>
                <div>
                  <Image
                    className="rounded-md border shadow-sm"
                    alt={`${selectedPromoterEtsOption.title} logo`}
                    src={selectedPromoterEtsOption.src || ""}
                    width={96}
                    height={96}
                  />
                </div>
                <div>Description:</div>
                <div className="font-medium">
                  {selectedPromoterEtsOption.description}
                </div>
              </div>
            </div>
          )}
      </div>
      <div className="mt-4" />
      <div className="flex">
        <Button
          className="grow"
          text="Confirmer la création de compte"
          type="button"
          onClick={handleCreation}
        />
      </div>
    </div>
  );
}
