import RoleBadge from "../../RoleBadge";
import Image from "next/image";
import Button from "../../Forms/atoms/button";
import { usePFEAuth } from "../../../context/PFEAuthContext";

export default function ReviewSection({
  handleProfileCreation,
}: {
  handleProfileCreation: () => void;
}) {
  const {
    selectedPromoterEtsOption,
    typeOfProfile,
    selectedOrganization,
    registrationUserData,
  } = usePFEAuth();
  return (
    <div className="rounded-md bg-gray-100 p-5 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Revue</h2>
      <p className="mb-6 text-gray-600">
        Veuillez vérifier les informations suivantes avant de continuer.
      </p>
      <div className="rounded-md border border-gray-200 bg-white p-4">
        <h3 className="mb-2 text-lg font-semibold">Type de compte</h3>
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
        <h3 className="mb-2 text-lg font-semibold">
          Informations personnelles
        </h3>
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
            <div>
              <h3 className="mt-4 mb-2 text-lg font-semibold">Organisation</h3>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                <div>Nom:</div>
                <div className="font-medium">{selectedOrganization.name}</div>
                <div>Logo:</div>
                <div>
                  <Image
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
            <div>
              <h3 className="mt-4 mb-2 text-lg font-semibold">Organisation</h3>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                <div>Nom:</div>
                <div className="font-medium">
                  {selectedPromoterEtsOption.title}
                </div>
                <div>Logo:</div>
                <div>
                  <Image
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
          onClick={handleProfileCreation}
        />
      </div>
    </div>
  );
}
