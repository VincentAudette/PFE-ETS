import React from "react";

export const useAuth = () => ({
  isSignedIn: true,
  userId: "mock-user-id",
});

export const ClerkProvider = ({ children }: any) => <>{children}</>;

export const UserButton = () => <div>UserButton</div>;
