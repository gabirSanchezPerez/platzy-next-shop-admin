import { useState } from "react";
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/24/solid";
import Modal from "@/src/common/modal";
import FormProduct from "../components/formProducts";

export default function Nav() {
  const router = useRouter();
  const route = router.pathname.substring(1);
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow flex justify-between">
        <div className="max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">{route ? route : "Bienvenido"}</h1>
        </div>
        {route && route !== "dashboard" && (
          <div className="pr-4 sm:pr-6 lg:pr-8 flex self-center">
            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setOpen(true)}
              >
                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                New
              </button>
            </span>
          </div>
        )}
      </nav>

      <Modal open={open} setOpen={setOpen}>
        <FormProduct />
      </Modal>
    </>
  );
}
