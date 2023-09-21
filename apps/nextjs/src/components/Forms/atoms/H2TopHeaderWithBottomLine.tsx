import { ReactNode } from "react";

export default function H2TopHeaderWithBottomLine({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h2 className="mb-3 border-b pb-3 text-lg font-bold tracking-normal">
      {children}
    </h2>
  );
}
