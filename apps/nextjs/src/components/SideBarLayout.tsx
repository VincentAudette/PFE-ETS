import VerticalNav from "./VerticalNav";

export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <VerticalNav />
      {/* <div className="ml-20 h-full w-[1px] rounded-full bg-neutral-200"></div> */}
      <div className="container flex w-full flex-col items-center justify-center gap-12 px-4 ">
        <div className="flex h-[60vh] w-full justify-center overflow-y-scroll rounded-md border p-4 text-2xl">
          {children}
        </div>
      </div>
    </>
  );
}
