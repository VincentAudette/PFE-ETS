import InfoAlert from "./InfoAlert";

export default function SplitInfoFormContainer({
  id,
  title,
  description,
  children,
  note,
}: {
  id: string;
  children: React.ReactNode;
  title: string;
  description: string;
  note?: string;
}) {
  return (
    <section
      id={id}
      className="flex flex-col items-start gap-4 py-4 md:flex-row md:gap-10 lg:py-10 "
    >
      <div className="flex flex-col gap-2 md:w-5/12">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="mb-2 text-sm text-gray-600">{description}</p>
        {note && <InfoAlert textXs={true} text={note} />}
      </div>
      <div className=" flex max-w-3xl items-end gap-3 rounded-lg md:w-7/12">
        {children}
      </div>
    </section>
  );
}
