import Link from "next/link";
import classNames from "../utils/classNames";

function Clickable({ children, className, isButton, ...props }: any) {
  return isButton ? (
    <>
      <button
        className={classNames("hidden gap-x-2 sm:flex", className)}
        {...props}
      >
        {children}
      </button>
      {/* Mobile will only show link*/}
      <Link
        className={classNames("flex gap-x-2 sm:hidden", className)}
        {...props}
      >
        {children}
      </Link>
    </>
  ) : (
    <Link className={classNames("flex gap-x-2", className)} {...props}>
      {children}
    </Link>
  );
}

export default Clickable;
