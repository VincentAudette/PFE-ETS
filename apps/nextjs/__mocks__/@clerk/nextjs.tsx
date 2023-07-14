// __mocks__/@clerk/nextjs.tsx
import { mockAuthState } from "../mockControl";

export const useAuth = () => mockAuthState;
export const ClerkProvider = ({ children }: any) => <>{children}</>;
export const UserButton = () => <div>UserButton</div>;
