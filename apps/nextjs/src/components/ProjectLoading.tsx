export default function ProjectLoading() {
  return (
    <div className=" mx-auto mt-10 mb-32 max-w-2xl animate-pulse">
      <div className="flex gap-2 text-xl font-bold">
        <div className="h-6 w-32 rounded-md bg-neutral-500"></div>
        <div className="h-6 w-4 text-neutral-500"> /</div>
        <div className="h-6 w-32 rounded-md bg-neutral-500"></div>
      </div>
      <div className="leading-20 mt-3 text-3xl font-semibold">
        <div className="h-8 w-full rounded-md bg-neutral-500 sm:h-12"></div>
      </div>
      <div className="my-10 flex justify-around divide-x overflow-x-scroll border-y bg-neutral-50 py-5 shadow-sm ">
        <div className="min-w-max pl-3">
          <div className="h-4 w-20 rounded-md bg-neutral-500"></div>
          <div className="mt-2 h-6 w-32 rounded-md bg-neutral-500"></div>
        </div>
        <div className="min-w-max pl-3">
          <div className="h-4 w-20 rounded-md bg-neutral-500"></div>
          <div className="mt-2 h-6 w-32 rounded-md bg-neutral-500"></div>
        </div>
      </div>
      <div className="text-sm text-neutral-500">Thématiques</div>
      <ul className="flex flex-wrap gap-2 py-2 text-sm text-neutral-800">
        <div className="inline-flex items-center rounded-full border bg-neutral-100 px-2.5 py-0.5 font-medium shadow-sm">
          <div className="h-4 w-20 rounded-md bg-neutral-500"></div>
        </div>
        <div className="inline-flex items-center rounded-full border bg-neutral-100 px-2.5 py-0.5 font-medium shadow-sm">
          <div className="h-4 w-20 rounded-md bg-neutral-500"></div>
        </div>
      </ul>
      <div className="h-5" />
      <div className="text-sm text-neutral-500">Expertises requises</div>
      <div className="flex flex-wrap gap-2 py-2 text-lg text-neutral-800">
        <div className="h-6 w-32 rounded-md bg-neutral-500"></div>
      </div>
      <hr className="my-10" />
      <ul className="flex flex-col gap-10">
        <li>
          <div className="text-sm text-neutral-500">
            <div className="h-4 w-20 rounded-md bg-neutral-500"></div>
          </div>
          <div className="mt-2 text-lg">
            <div className="h-6 w-full rounded-md bg-neutral-500"></div>
          </div>
        </li>
      </ul>
      <div className="h-10" />
      <section className="flex max-w-2xl flex-col gap-3 text-base">
        <hr className="my-5" />
        <h2 className=" text-xl font-bold">
          <div className="h-6 w-32 rounded-md bg-neutral-500"></div>
        </h2>
        <div>
          <ul role="list" className="divide-y divide-neutral-100">
            <div className="h-6 w-full rounded-md bg-neutral-500"></div>
          </ul>
        </div>
        <hr className="my-5" />
      </section>
      <hr className="my-10" />
      <section id="legal" className="flex flex-col gap-4">
        <div className="flex items-start">
          <div className="mt-3 flex items-center justify-items-center gap-2 rounded-md bg-green-50 py-2 px-3 text-green-800">
            <div className=" h-auto w-4 min-w-[1.2rem] rounded-md bg-neutral-500"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
