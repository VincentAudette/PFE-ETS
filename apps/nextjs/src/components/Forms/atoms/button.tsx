export default function Button(props: {
  text: string;
  type?: any;
  onClick?: any;
  className?: string;
}) {
  return (
    <button
      onClick={props.onClick ?? undefined}
      type={props.type ? props.type : "button"}
      className={`max-h-min rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${props.className}`}
    >
      {props.text}
    </button>
  );
}
