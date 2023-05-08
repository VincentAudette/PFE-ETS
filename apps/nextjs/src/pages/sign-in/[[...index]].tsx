import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../../components/AuthLayout";

const SignInPage = () => (
  <AuthLayout titre="Connexion vers l'application PFE ÉTS">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </AuthLayout>
);

export default SignInPage;
