import { CustomerAddressDTO } from "@/app/types/customer/validators/CustomerDTO";
import { PencilIcon } from "@heroicons/react/24/outline";

interface AddressCartProps{
    address: CustomerAddressDTO
}

export default function addressCard({address}:AddressCartProps){
    return (
        <div className="p-5 rounded-md border border-gray-200 w-full">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold">{address.street} {address.number}</h1>
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition duration-200 cursor-pointer"
              aria-label="Editar endereço">
              <PencilIcon className="w-5 h-5 text-gray-600" />
            </button> 
          </div>
          <div className="space-y-1 text-sm text-gray-500 font-semibold">
            <p>{address.neighborhood}, {address.zipCode.replace(/^(\d{5})(\d{3})$/, "$1-$2")} - Porto Velho - RO</p>
            <p>Principal: João Vitor Araújo</p>
          </div>
        </div>
     
    );
}