import { CheckIcon } from "@heroicons/react/24/solid";
import { usePFEAuth } from "../../../context/PFEAuthContext";
import { useRouter } from "next/router";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface Step {
  id: number;
  name: string;
  description: string;
}

export default function Steps({ steps }: { steps?: Step[] }) {
  const router = useRouter();
  const { currentStep, setCurrentStep, setTypeOfProfile, typeOfProfile } =
    usePFEAuth();
  return (
    <div className=" overflow-hidden rounded-lg lg:border lg:border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-0" aria-label="Progress">
        <ol
          role="list"
          className="overflow-hidden rounded-md lg:flex lg:rounded-none"
        >
          {steps &&
            steps.map((step, stepIdx) => (
              <li key={step.id} className="relative overflow-hidden lg:flex-1">
                <div
                  className={classNames(
                    stepIdx === 0 ? "rounded-t-md border-b-0" : "",
                    stepIdx === steps.length - 1
                      ? "rounded-b-md border-t-0"
                      : "",
                    "overflow-hidden border border-gray-200 lg:border-0",
                  )}
                >
                  {step.id < currentStep ? (
                    <button
                      onClick={() => {
                        setCurrentStep(step.id);
                        if (step.id === 1) {
                          setTypeOfProfile(null);
                          router.push("/register");
                        }
                        if (step.id === 2) {
                          switch (typeOfProfile) {
                            case "STUDENT":
                              router.push("/register/student");
                              break;
                            case "PROMOTER":
                              router.push("/register/promoter-externe");
                              break;
                            case "PROMOTER_ETS":
                              router.push("/register/promoter-ets");
                              break;
                            default:
                              router.push("/register");
                              break;
                          }
                        }
                      }}
                      className="group"
                    >
                      <span
                        className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? "lg:pl-9" : "",
                          "flex items-start px-6 py-5 text-sm font-medium",
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                            <CheckIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </span>
                        <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            {step.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  ) : step.id === currentStep ? (
                    <button disabled={true} aria-current="step">
                      <span
                        className="absolute left-0 top-0 h-full w-1 bg-blue-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? "lg:pl-9" : "",
                          "flex items-start px-6 py-5 text-sm font-medium",
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600">
                            <span className="text-blue-600">{step.id}</span>
                          </span>
                        </span>
                        <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                          <span className="text-sm font-medium text-blue-600">
                            {step.name}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            {step.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCurrentStep(step.id);
                      }}
                      className="group"
                    >
                      <span
                        className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? "lg:pl-9" : "",
                          "flex items-start px-6 py-5 text-sm font-medium",
                        )}
                      >
                        <span className="flex-shrink-0">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                            <span className="text-gray-500">{step.id}</span>
                          </span>
                        </span>
                        <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                          <span className="text-sm font-medium text-gray-500">
                            {step.name}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            {step.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  )}

                  {stepIdx !== 0 ? (
                    <>
                      {/* Separator */}
                      <div
                        className="absolute inset-0 left-0 top-0 hidden w-3 lg:block"
                        aria-hidden="true"
                      >
                        <svg
                          className="h-full w-full text-gray-300"
                          viewBox="0 0 12 82"
                          fill="none"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0.5 0V31L10.5 41L0.5 51V82"
                            stroke="currentcolor"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
        </ol>
      </nav>
    </div>
  );
}
