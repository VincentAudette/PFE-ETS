// Do this in the component
// export const updateToPromoter =
// trpc.user.updateToPromoterWithOrganisation.useMutation();

import { Organization } from "@acme/db";
import { RadioCardsWithImageOption } from "../components/Forms/atoms/RadioCardsWithImage";

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
export const createPromoter = (
  userClerkId: string,
  promoter: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  },
  trpc: any,
  organization:
    | RadioCardsWithImageOption
    | {
        id: number;
        name: string;
      }
    | (Organization & { logo: File | null })
    | null,
): Promise<{ success: boolean; message: string }> => {
  if (!promoter.firstName || !promoter.lastName) {
    return Promise.reject(
      new Error("Veuillez renseigner votre prénom et votre nom de famille"),
    );
  }

  if (organization?.id !== -1) {
    return trpc
      .mutateAsync({
        clerkId: userClerkId,
        organizationId: organization?.id,
        firstName: promoter.firstName,
        lastName: promoter.lastName,
        phone: promoter.phone,
      })
      .then(() => {
        return {
          success: true,
          message: "Votre profil a été mis à jour avec succès",
        };
      })
      .catch((err: any) => {
        return Promise.reject(err); // you may want to normalize the error object here
      });
  } else {
    return Promise.reject(new Error("Veuillez choisir une organisation"));
  }
};

/**
 * Function to create a promoter.
 *
 * @param userClerkId ClerkId of the user.
 * @param promoter Promoter data needed to pass to the mutation.
 * @param trpc Whatever trpc.route.path.useMutation() that has to be used in the component.
 * @param organization Organization data needed to pass to the mutation, the id is the most important.
 */
export const createStudent = async (
  userClerkId: string,
  student: {
    firstName: string;
    lastName: string;
    email: string;
  },
  trpc: any,
  departmentId: string,
): Promise<{ success: boolean; message: string }> => {
  if (!student.firstName || !student.lastName) {
    return Promise.reject(
      new Error("Veuillez renseigner votre prénom et votre nom de famille"),
    );
  }

  if (departmentId) {
    return trpc
      .mutateAsync({
        clerkId: userClerkId,
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        departmentId,
      })
      .then(() => {
        return {
          success: true,
          message: "Votre profil a été mis à jour avec succès",
        };
      })
      .catch((err: any) => {
        return Promise.reject(err); // you may want to normalize the error object here
      });
  } else {
    return Promise.reject(new Error("Veuillez choisir un département"));
  }
};
