import { InformationCircleIcon } from "@heroicons/react/20/solid";

export default function InfoAlert({
  text,
  textXs = false,
  dimmed = false,
}: {
  text: string;
  textXs?: boolean;
  dimmed?: boolean;
}) {
  return (
    <div
      className={`max-w-4xl rounded-md  ${
        dimmed ? "bg-neutral-100" : "bg-blue-50"
      } p-4`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className={`"h-5 w-5 ${
              dimmed ? "text-neutral-400" : "text-blue-400"
            }`}
            aria-hidden="true"
          />
        </div>
        <div className="hyphens-auto ml-3 flex-1 md:flex md:justify-between">
          <p
            className={` 
            ${textXs ? " text-xs" : "text-sm"}
            ${dimmed ? "text-neutral-600 " : "text-blue-800"}`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
