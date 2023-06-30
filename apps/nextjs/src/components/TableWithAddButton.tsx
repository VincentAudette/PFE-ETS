import { NoSymbolIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import SimpleInput from "./Forms/atoms/SimpleInput";
import SimpleSelect, { SelectOption } from "./Forms/atoms/SimpleSelect";

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

interface TempValues {
  [key: string]: SelectOption | string;
}

export default function TableWithAddButton({
  title,
  description,
  buttonTitle = "Nouveau",
  objs,
  obj,
  placeholderObj,
  setObjs,
  selectFields,
  selectOptions,
}: {
  title: string;
  description: string;
  objs: any[];
  obj: any;
  buttonTitle?: string;
  placeholderObj: any;
  setObjs: (objs: any[]) => void;
  selectFields?: string[];
  selectOptions?: any;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<TempValues | null>(null);
  const [isNewObj, setIsNewObj] = useState(false);

  const handleInputChange = (key: string, value: any) => {
    setTempValues({ ...tempValues, [key]: value });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTempValues(null);
  };

  const saveEdit = (object: any) => {
    handleEdit({ ...object, ...tempValues });
    cancelEdit();
  };

  const handleEdit = (updatedObj: any) => {
    const newObjs = objs.map((obj) =>
      obj.id === updatedObj.id ? updatedObj : obj,
    );
    setObjs(newObjs);
  };

  const handleDelete = (id: number) => {
    const newObjs = objs.filter((obj) => obj.id !== id);
    setObjs(newObjs);
  };

  return (
    <div className="w-full  sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-base font-semibold leading-6 text-neutral-900">
            {title}
          </h2>
          <p className="mt-2  text-sm text-neutral-700">{description}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {objs.length < 1 ? (
            <div className="flex max-w-min rounded-md border shadow-sm">
              <button
                onClick={() => {
                  setEditingId(null); // Cancel any current editing
                  setObjs([...objs, placeholderObj]); // Add the placeholder object to objs
                  setEditingId(placeholderObj.id); // Start editing the new row
                  const newObj = {
                    id: generateUniqueId(),
                  };
                  setObjs([...objs, newObj]);
                  setEditingId(newObj.id);
                  setIsNewObj(true);
                }}
                className=" rounded-l-md bg-white px-3 py-2 hover:bg-neutral-100"
              >
                OUI
              </button>
              <button
                disabled={true}
                className="rounded-r-md bg-blue-600 px-3 py-2 text-white hover:cursor-not-allowed"
              >
                NON
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setEditingId(null); // Cancel any current editing
                setObjs([...objs, placeholderObj]); // Add the placeholder object to objs
                setEditingId(placeholderObj.id); // Start editing the new row
                const newObj = {
                  id: generateUniqueId(),
                };
                setObjs([...objs, newObj]);
                setEditingId(newObj.id);
                setIsNewObj(true);
              }}
              type="button"
              className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Ajouter un <span className="lowercase">{buttonTitle}</span>
            </button>
          )}
        </div>
      </div>
      {objs.length >= 1 && (
        <div className="mt-10 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 lg:overflow-visible">
            <div className="inline-block min-w-full border py-2 align-middle sm:rounded-lg">
              <table className="min-w-full table-auto divide-y divide-neutral-300">
                <thead>
                  <tr>
                    {Object.keys(obj).map((key: any) => (
                      <th
                        key={key}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-900 sm:pl-6 lg:pl-8"
                      >
                        {obj[key]}
                      </th>
                    ))}
                    <th scope="col" className="relative py-3.5 pl-3">
                      <span className="sr-only">Modifier</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y  divide-neutral-200 bg-white">
                  {objs.map((object, i) => (
                    <tr key={object.id}>
                      {Object.keys(obj).map((key: string, i: number) => (
                        <td
                          key={key}
                          className={
                            i === 0 || i === 1
                              ? "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-900 sm:pl-6 lg:pl-8"
                              : "whitespace-nowrap px-3 py-4 text-sm text-neutral-500"
                          }
                        >
                          {editingId === object.id ? (
                            selectFields?.includes(key) ? (
                              <SimpleSelect
                                maxWidth={"max-w-[12.75rem]"}
                                withLabel={false}
                                name={key}
                                options={selectOptions[key]}
                                selectedState={
                                  (tempValues && tempValues[key]) ||
                                  selectOptions[key][0]
                                }
                                setSelectedState={(value) =>
                                  handleInputChange(key, value)
                                }
                                label={placeholderObj[key]}
                              />
                            ) : (
                              <SimpleInput
                                name={key + "-" + object.id}
                                placeholder={placeholderObj[key]}
                                withLabel={false}
                                value={
                                  editingId === object.id
                                    ? (tempValues && tempValues[key]) || ""
                                    : object[key]
                                }
                                onChange={(e) =>
                                  handleInputChange(key, e.target.value)
                                }
                              />
                            )
                          ) : selectFields?.includes(key) ? (
                            object[key].name
                          ) : (
                            object[key]
                          )}
                        </td>
                      ))}
                      <td className="relative whitespace-nowrap py-4 px-3 text-right text-sm font-medium">
                        {editingId === object.id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                saveEdit(object);
                              }}
                              className="rounded-md bg-blue-600 py-1 px-2 text-white hover:bg-blue-900"
                            >
                              Sauvegarder
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                if (isNewObj) {
                                  setObjs(
                                    objs.filter((o) => o.id !== editingId),
                                  ); // Remove the new row
                                }
                                cancelEdit();
                              }}
                              className=" group ml-2 rounded-md p-1 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                            >
                              <NoSymbolIcon className="h-4 w-4" />
                              <div className="absolute z-50 m-1 hidden rounded-md border-t bg-neutral-700 px-2 py-1 text-xs text-neutral-50 shadow-md shadow-neutral-400/20 group-hover:block">
                                Canceller
                              </div>
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setIsNewObj(false);
                                setEditingId(object.id);
                                setTempValues(object);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Modifier
                            </button>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(object.id);
                              }}
                              className="group ml-2 rounded-md p-1 text-neutral-500 hover:bg-red-200 hover:text-red-600"
                            >
                              <XMarkIcon className="h-4 w-4" />
                              <div className="absolute m-1 hidden rounded-md border-t bg-red-700 px-2 py-1 text-xs text-neutral-50 shadow-md shadow-neutral-400/20 group-hover:block">
                                Supprimer
                              </div>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
