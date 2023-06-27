// Do this in the component
// export const updateToPromoter =
// trpc.user.updateToPromoterWithOrganisation.useMutation();

// When receiving the form data, we can use the following function to create the promoter.
/*!SECTION
Do the following in the component:
 .then(() => {
      window.location.reload();
    });
*/

/**
 * Function to create a promoter.
 *
 * @param userClerkId ClerkId of the user.
 * @param promoter Promoter data needed to pass to the mutation.
 * @param trpc Whatever trpc.route.path.useMutation() that has to be used in the component.
 * @param type External or internal promoter
 * @param organization Organization data needed to pass to the mutation, the id is the most important.
 */
export const createPromoter = async (
  userClerkId: string,
  promoter: any,
  trpc: any,
  type: "PROMOTER" | "PROMOTER_ETS", // Pretty sure this is not needed anymore.
  organization: {
    id: number;
    name: string;
  },
) => {
  if (!promoter.firstName && !promoter.lastName) {
    throw new Error("Veuillez renseigner votre prénom et votre nom de famille");
  }

  if (organization?.id !== -1) {
    trpc
      .mutateAsync({
        clerkId: userClerkId,
        organizationId: organization.id,
        firstName: promoter.firstName,
        lastName: promoter.lastName,
      })
      .then(() => {
        return {
          success: true,
          message: "Votre profil a été mis à jour avec succès",
        };
      });
  } else {
    throw new Error("Veuillez choisir une organisation");
  }
};
