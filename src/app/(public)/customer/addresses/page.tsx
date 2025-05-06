'use client'

import { useAuth } from "@/context/auth/AuthContext";
import { useEffect, useState } from "react";
import AddressModal, { CustomerAddressDTO } from "../../ui/modals/AddressModal";
import AddressCard from "./components/AddressCard";
import { AddUserAdressAsync, GetUserAddressesAsyc } from "../../services/userService";

export default function AddressesArea() {
  const { user } = useAuth();
  if (!user) return;

  const [userAddresses, setUserAddresses] = useState<CustomerAddressDTO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const fetchAddresses = () =>  GetUserAddressesAsyc(user.id).then(setUserAddresses);
  useEffect(() => {
    fetchAddresses()
  }, [user]);

  if (!user) return null;


  const handleAddressSave = async (form: CustomerAddressDTO ) => {
    await AddUserAdressAsync(form)
    fetchAddresses()
  }
  return (
    <div className="relative min-h-screen pb-24"> {/* espaço para o botão */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 w-full">
        {userAddresses.map(address => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>

      {/* Botão fixo no centro inferior */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="
          fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10
          bg-blue-600 hover:bg-blue-700 text-white
          px-6 py-3 rounded-full
          font-semibold cursor-pointer
          shadow-lg
          transition-colors duration-200
        "
      >
        + Adicionar Endereço
      </button>

      <AddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={(data) => handleAddressSave(data)}></AddressModal>
    </div>
  );
}
