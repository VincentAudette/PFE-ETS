import { BookOpenIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const linkItems = [
  {
    href: "https://pfe-etsmtl.notion.site",
    IconSvg: BookOpenIcon,
    text: "Documentation",
  },
  {
    href: "https://github.com/VincentAudette/PFE-ETS",
    IconSvg: ({ className }: { className: string }) => (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    text: "Code source",
  },
  {
    href: "https://discord.gg/3t7RcRak5Y",
    IconSvg: ({ className }: { className: string }) => (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1299.646 985.006"
      >
        <path
          fill="currentColor"
          id="Path_137"
          data-name="Path 137"
          d="M1100.924,82.493A1074.856,1074.856,0,0,0,832.8,0a736.635,736.635,0,0,0-34.346,69.817,998.494,998.494,0,0,0-297.567,0A739.753,739.753,0,0,0,466.538,0,1082.424,1082.424,0,0,0,198.206,82.7C28.519,333.753-17.481,578.573,5.519,819.918h0A1080.787,1080.787,0,0,0,334.365,985.006,794.263,794.263,0,0,0,404.8,871.438a699.386,699.386,0,0,1-110.91-52.951c9.3-6.747,18.4-13.7,27.191-20.444a772.488,772.488,0,0,0,657.488,0c8.893,7.258,17.991,14.209,27.191,20.444A702.076,702.076,0,0,1,894.641,871.54a787.094,787.094,0,0,0,70.431,113.466A1075.88,1075.88,0,0,0,1294.122,820.02h0C1321.109,540.138,1248.02,297.567,1100.924,82.493Zm-666.995,589c-64.093,0-117.044-58.164-117.044-129.719S368,411.543,433.725,411.543s118.27,58.675,117.146,130.23S499.249,671.493,433.929,671.493Zm431.783,0c-64.2,0-116.941-58.164-116.941-129.719s51.111-130.23,116.941-130.23,117.964,58.675,116.839,130.23S931.032,671.493,865.712,671.493Z"
          transform="translate(0)"
        />
      </svg>
    ),
    text: "Discord",
  },
  {
    href: "/logo",
    IconSvg: ({ className }: { className: string }) => (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 658 658"
      >
        <g id="Group_18" data-name="Group 18" transform="translate(-1619 -598)">
          <rect
            id="Rectangle_12"
            data-name="Rectangle 12"
            width="658"
            height="658"
            transform="translate(1619 598)"
            fill="none"
          />
          <g
            id="Group_17"
            data-name="Group 17"
            transform="translate(1686.537 824.101)"
          >
            <path
              id="Path_57"
              data-name="Path 57"
              d="M988.743,453.371c45.628,0,71.836,19.421,71.836,58.886,0,50.253-35.149,82.01-93.726,82.01H936.024l-13.255,61.969H879.3l43.162-202.865ZM967.781,560.044c29.287,0,49.02-14.8,49.02-43.47,0-15.724-8.63-25.588-31.448-25.588H957.915l-14.8,69.058Z"
              transform="translate(-879.296 -453.371)"
              fill="currentColor"
            />
            <path
              id="Path_58"
              data-name="Path 58"
              d="M999.9,577.926l-16.338,78.31H940.091l42.856-202.865h138.427l-8.013,38.537H1018.4l-11.1,52.1h80.78l-7.4,33.915Z"
              transform="translate(-761.574 -453.371)"
              fill="currentColor"
            />
            <path
              id="Path_59"
              data-name="Path 59"
              d="M1056.346,569.3l-10.486,49.325h100.817l-8.016,37.615H994.374l43.162-202.865h138.738l-8.013,37.92h-95.268L1063.438,536h82.315l-7.092,33.3Z"
              transform="translate(-656.462 -453.371)"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    ),
    text: "Marque Logo",
  },
];

const ItemSquare = ({
  href,
  IconSvg,
  text,
  key,
}: {
  key: string;
  href: string;
  IconSvg: any;
  text: string;
}) => {
  return (
    <Link
      key={key}
      href={href}
      target="_blank"
      className={
        "flex h-[3.5rem] w-[3.5rem] flex-col items-center justify-center bg-neutral-800/25 hover:bg-neutral-100/50 hover:text-red-600 "
      }
    >
      <IconSvg className="h-8 w-8" />
      <p className=" text-[0.5rem]">{text}</p>
    </Link>
  );
};

export default function LinkBox({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid h-[3.5rem] grid-cols-2">
        {linkItems.map((item) => (
          <>
            <ItemSquare
              href={item.href}
              key={item.href}
              IconSvg={item.IconSvg}
              text={item.text}
            />
          </>
        ))}
      </div>
    </div>
  );
}
