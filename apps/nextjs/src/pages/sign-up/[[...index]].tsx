import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../components/AuthLayout";

const SignUpPage = () => (
  <AuthLayout titre="Créer un compte dans l'application PFE ÉTS">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </AuthLayout>
);

export default SignUpPage;
