import { PencilIcon } from "@heroicons/react/24/outline";

export default function AddressesArea() {
  return (
    <div className="flex flex-wrap  gap-5">
      <div className="p-5 rounded-md border border-gray-200 w-full md:w-96">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold">Rua Marechal Rondon 132</h1>
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
            aria-label="Editar endereço"
          >
            <PencilIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="space-y-1 text-sm text-gray-500 font-semibold">
          <p>Pedrinhas - 76801-540 - Porto Velho - RO</p>
          <p>Principal: João Vitor Araújo</p>
        </div>
      </div>
    </div>
  );
}
